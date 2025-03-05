import {
  Wallet,
  isAddress,
  JsonRpcProvider,
  WebSocketProvider,
  formatEther,
  parseEther,
  HDNodeWallet,
  Mnemonic,
  AddressLike, ethers,
} from "ethers";
import { validateMnemonic } from "@scure/bip39";
import { wordlist } from '@scure/bip39/wordlists/english';
import { Alchemy, Network } from "alchemy-sdk";
import uuid from "react-native-uuid";
import { truncateBalance } from "../utils/truncateBalance";

interface ExtendedHDNodeWallet extends HDNodeWallet {
  derivationPath: string;
}

interface SendTransactionResponse {
  gasEstimate: string;
  totalCost: string;
  totalCostMinusGas: string;
  gasFee: bigint;
}

interface AssetTransferParams {
  fromBlock: string;
  excludeZeroValue: boolean;
  withMetadata: boolean;
  maxCount?: number;
  toAddress?: string;
  fromAddress?: string;
  pageKey?: string;
  category: string[];
}

class EthereumService {
  private provider: JsonRpcProvider;
  private webSocketProvider: WebSocketProvider;
  private alchemy: Alchemy;

  constructor(
    private apiKey: string,
    private ethUrl: string,
    private socketUrl: string,
    private environment: string
  ) {
    const network =
      environment === "production" ? Network.ETH_MAINNET : Network.ETH_SEPOLIA;
    this.provider = new JsonRpcProvider(ethUrl + apiKey);
    this.webSocketProvider = new WebSocketProvider(socketUrl + apiKey);
    this.alchemy = new Alchemy({
      apiKey: apiKey,
      network: network,
    });
  }

  async createWallet(): Promise<HDNodeWallet> {
    return new Promise((resolve, reject) => {
      try {
        const wallet = HDNodeWallet.createRandom();
        resolve(wallet);
      } catch (error:any) {
        reject(new Error("Failed to create wallet: " + error.message));
      }
    });
  }

  // 从助记词中加载钱包
  async restoreWalletFromPhrase(mnemonicPhrase: string): Promise<HDNodeWallet> {
    if (!mnemonicPhrase) {
      throw new Error("Mnemonic phrase cannot be empty.");
    }

    if (!validateMnemonic(mnemonicPhrase, wordlist)) {
      throw new Error("Invalid mnemonic phrase ");
    }

    try {
      const ethWallet = HDNodeWallet.fromPhrase(mnemonicPhrase);
      return ethWallet;
    } catch (error) {
      throw new Error(
        "Failed to restore wallet from mnemonic: " + (error as Error).message
      );
    }
  }

  // 从助记词中加载私钥
  async derivePrivateKeysFromPhrase(
    mnemonicPhrase: string,
    derivationPath: string
  ) {
    if (!mnemonicPhrase) {
      throw new Error("Empty mnemonic phrase ");
    }

    if (!validateMnemonic(mnemonicPhrase, wordlist)) {
      throw new Error("Invalid mnemonic phrase ");
    }

    const mnemonic = Mnemonic.fromPhrase(mnemonicPhrase);
    try {
      const ethWallet = HDNodeWallet.fromMnemonic(mnemonic, derivationPath);
      return ethWallet.privateKey;
    } catch (error) {
      throw new Error(
        "Failed to derive wallet from mnemonic: " + (error as Error).message
      );
    }
  }

  // 通过钱包排名索引创建钱包
  async createWalletByIndex(
    phrase: string,
    index: number = 0
    // TODO: Fix extending type
  ): Promise<any> {
    try {
      const mnemonic = Mnemonic.fromPhrase(phrase);
      const path = `m/44'/60'/0'/0/${index}`;
      const wallet = HDNodeWallet.fromMnemonic(mnemonic, path);
      return {
        ...wallet,
        derivationPath: path,
      };
    } catch (error) {
      throw new Error(
        "failed to create Ethereum wallet by index: " + (error as Error).message
      );
    }
  }

  // 发送转账交易
  async sendTransaction(
    toAddress: AddressLike,
    privateKey: string,
    value: string
  ): Promise<any> {
    const signer = new Wallet(privateKey, this.provider);
    const transaction = {
      to: toAddress,
      value: parseEther(value),
    };
    try {
      const response = await signer.sendTransaction(transaction);
      return response;
    } catch (error) {
      console.error("Failed to send transaction:", error);
      throw new Error("Failed to send transaction. Please try again later.");
    }
  }

  // 计算Gas消耗数量
  async calculateGasAndAmounts(
    toAddress: string,
    amount: string
  ): Promise<SendTransactionResponse> {
    const amountInWei = parseEther(amount.toString());
    const transaction = {
      to: toAddress,
      value: amountInWei,
    };
    try {
      // Estimate gas
      const gasEstimate = await this.provider.estimateGas(transaction);
      const gasFee = (await this.provider.getFeeData()).maxFeePerGas;
      // @ts-ignore
      const gasPrice = BigInt(gasEstimate) * BigInt(gasFee);

      // Calculate total cost
      const totalCost = amountInWei + gasPrice; // Gas 总的消耗
      const totalCostMinusGas = amountInWei - gasPrice; // 除去Gas后的实际交易成本

      return {
        gasEstimate: formatEther(gasPrice),
        totalCost: formatEther(totalCost),
        totalCostMinusGas: formatEther(totalCostMinusGas),
        //@ts-ignore
        gasFee,
      };
    } catch (error) {
      console.error("Failed to calculate gas:", error);
      throw new Error("Unable to calculate gas. Please try again later.");
    }
  }

  // 获取该地址链上交易的历史记录
  async fetchTransactions(address: string, pageKeys?: string[]): Promise<any> {
    const paramsBuilder = (): AssetTransferParams => ({
      fromBlock: "0x0",
      excludeZeroValue: true,
      withMetadata: true,
      category: [
        "internal",
        "external",
        "erc20",
        "erc721",
        "erc1155",
        "specialnft",
      ],
    });

    const sentParams = paramsBuilder();
    const receivedParams = paramsBuilder();

    if (pageKeys && pageKeys.length === 2) {
      sentParams.pageKey = pageKeys[0];
      receivedParams.pageKey = pageKeys[1];
    }

    sentParams.fromAddress = address;
    receivedParams.toAddress = address;

    const sentTransfers = await this.alchemy.core.getAssetTransfers(
      // @ts-ignore
      sentParams
    );
    const receivedTransfers = await this.alchemy.core.getAssetTransfers(
      // @ts-ignore
      receivedParams
    );

    const transformTransfers = (txs: any, direction: any) =>
      txs.map((tx: any) => ({
        ...tx,
        uniqueId: uuid.v4(),
        value: parseFloat(truncateBalance(tx.value)),
        blockTime: new Date(tx.metadata.blockTimestamp).getTime() / 1000,
        direction,
      }));

    const allTransfers = [
      ...transformTransfers(sentTransfers.transfers, "sent"),
      ...transformTransfers(receivedTransfers.transfers, "received"),
    ].sort((a, b) => b.blockTime - a.blockTime);

    return {
      transferHistory: allTransfers,
      paginationKey: [sentTransfers.pageKey, receivedTransfers.pageKey],
    };
  }

  // 验证地址是否合法
  validateAddress(address: string): boolean {
    return isAddress(address);
  }

  // 查找未使用钱包的索引值
  async findNextUnusedWalletIndex(phrase: string, index: number = 0) {
    if (!phrase) {
      throw new Error("Empty mnemonic phrase ");
    }

    if (!validateMnemonic(phrase, wordlist)) {
      throw new Error("Invalid mnemonic phrase ");
    }

    let currentIndex = index;
    const mnemonic = Mnemonic.fromPhrase(phrase);

    while (true) {
      const path = `m/44'/60'/0'/0/${currentIndex}`;
      const wallet = HDNodeWallet.fromMnemonic(mnemonic, path);

      const transactions = await this.fetchTransactions(wallet.address);
      if (transactions.transferHistory.length === 0) {
        // 证实这是一个未使用的钱包地址索引，可以用来生成一个新的钱包
        break;
      }
      currentIndex += 1;
    }

    return currentIndex > 0 ? currentIndex + 1 : 0;
  }

  // 导入所有激活的钱包地址
  async importAllActiveAddresses(mnemonicPhrase: string, index?: number) {
    if (index) {
      const usedAddresses = await this.collectedUsedAddresses(
        mnemonicPhrase,
        index
      );
      return usedAddresses;
    } else {
      const unusedAddressIndex = await this.findNextUnusedWalletIndex(
        mnemonicPhrase
      );
      const usedAddresses = await this.collectedUsedAddresses(
        mnemonicPhrase,
        unusedAddressIndex
      );
      return usedAddresses;
    }
  }

  // 收集使用过的钱包地址
  async collectedUsedAddresses(phrase: string, unusedIndex: number) {
    const startingIndex = unusedIndex > 0 ? unusedIndex - 1 : unusedIndex;
    const mnemonic = Mnemonic.fromPhrase(phrase);
    const addressesUsed = [];
    // 遍历该索引下的所有钱包都送进集合中
    for (let i = 0; i <= startingIndex; i++) {
      const path = `m/44'/60'/0'/0/${i}`;
      const wallet = HDNodeWallet.fromMnemonic(mnemonic, path);
      const walletWithDetails = {
        ...wallet,
        derivationPath: path,
      };
      addressesUsed.push(walletWithDetails);
    }

    return addressesUsed;
  }

  // 获取账户余额
  // @ts-ignore
  async getBalance(address: AddressLike): Promise<bigint> {
    try {
      return this.provider.getBalance(address);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  }

  // 确认交易是否成功
  async confirmTransaction(txHash: string): Promise<boolean> {
    try {
      const receipt = await this.provider.waitForTransaction(txHash) || {status:null};
      return receipt.status === 1;
    } catch (error) {
      console.error("Error confirming Ethereum transaction:", error);
      return false;
    }
  }

  // 获取当前的WebSocketProvider
  getWebSocketProvider() {
    return this.webSocketProvider;
  }

  // 返回当前连接的provider
  getProvider() {
    return this.provider;
  }

  // 根据私钥获取钱包
  getWalletByPublicKey(privateKey: string) {
    const wallet = new ethers.Wallet(privateKey, this.provider);
    return wallet.address;
  }
}

//@ts-ignore
const ethService = new EthereumService(process.env.EXPO_PUBLIC_ALCHEMY_ETH_KEY,
  process.env.EXPO_PUBLIC_ALCHEMY_ETH_URL,
  process.env.EXPO_PUBLIC_ALCHEMY_SOCKET_URL,
  process.env.EXPO_PUBLIC_ENVIRONMENT
);

export default ethService;
