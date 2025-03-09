import {TronWeb} from "tronweb";
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import {validateMnemonic} from "@scure/bip39";
import {getTransactionIDHistory} from "@/services/TronWebService";


class TronService {
    public tronWeb: TronWeb;

    constructor(
        private hostUrl: string,
        private APIKEY: string
    ) {
        this.tronWeb = new TronWeb({
            fullHost: hostUrl,
            headers: { 'TRON-PRO-API-KEY': APIKEY }
        });
    }

    getProvider() {
        return this.tronWeb;
    }

    // 创建钱包
    async createWallet(){
        return new Promise((resolve, reject) => {
            try {
                const wallet = TronWeb.createRandom()
                resolve(wallet)
            }catch (err) {
                reject(new Error("Failed to create wallet:" + (err as Error).message))
            }
        })
    }

    // 从助记词中加载钱包
    async restoreWalletFromPhrase(mnemonicPhrase: string){
        if (!mnemonicPhrase) {
            throw new Error("Mnemonic phrase cannot be empty.");
        }

        if (!bip39.validateMnemonic(mnemonicPhrase, wordlist)) {
            throw new Error("Invalid mnemonic phrase ");
        }

        try {
            const tronWallet = TronWeb.fromMnemonic(mnemonicPhrase);
            return tronWallet
        }catch (err) {
            throw new Error("Failed to restore wallet from mnemonic: " + (err as Error).message);
        }
    }

    // 从助记词中加载私钥
    async derivePrivateKeysFromPhrase(mnemonicPhrase: string){
        const tronWallet = await this.restoreWalletFromPhrase(mnemonicPhrase);
        return tronWallet.privateKey;
    }

    // 通过钱包排名索引创建钱包
    async createWalletByIndex(phrase: string, index: number = 0){
        // 初始化钱包路径索引
        const path = `m/44'/195'/0'/0/${index}`;
        try {
            const tronWallet = TronWeb.fromMnemonic(phrase, path);
            return {
                ...tronWallet,
                derivationPath: path
            }
        }catch (err) {
            throw new Error(
                "failed to create Ethereum wallet by index: " + (err as Error).message
            )
        }
    }

    // 发送转账交易
    async sendTransaction(fromAddress: string, toAddress: string, value: number){
        const transaction = await this.tronWeb.transactionBuilder.sendTrx(toAddress, value, fromAddress);
        try {
            const signedTransaction = await this.tronWeb.trx.signTransaction(transaction)
            const result = await this.tronWeb.trx.sendRawTransaction(signedTransaction)
            return result;
        }catch (err) {
            console.log("Transaction err:", err);
            throw new Error("Failed to send transaction. Please try again later.")
        }
    }

    // 获取交易所需的资源

    // 获取地址的交易历史 =》外部接口

    // 验证地址是否合法
    validateAddress(address: string){
        return TronWeb.isAddress(address);
    }

    // 查找未使用的钱包地址的索引值
    async findUnusedAddressIndex(phrase: string, index: number = 0){
        if (!phrase) {
            throw new Error("Empty mnemonic phrase ");
        }

        if (!validateMnemonic(phrase, wordlist)) {
            throw new Error("Invalid mnemonic phrase ");
        }

        let currentIndex = index;

        while (true){
            const path = `m/44'/195'/0'/0/${currentIndex}`;
            const wallet = TronWeb.fromMnemonic(phrase, path);

            const transactionsIds = await getTransactionIDHistory(wallet?.publicKey, "");

            if ((transactionsIds as any).lenght == 0){
                break
            }
            currentIndex += 1
        }

        return currentIndex > 0 ? currentIndex + 1 : 0;
    }

    // 导入所有激活的钱包地址
    async importAllActiveAddresses(phrase: string, index?: number){
        if (index){
            const  usedAddress = await this.collectedUsedAddress(phrase, index)
            return usedAddress
        }else {
            const unusedIndex = await this.findUnusedAddressIndex(phrase)
            return await this.collectedUsedAddress(phrase, unusedIndex)
        }
    }

    // 收集使用过的钱包地址
    async collectedUsedAddress(phrase: string, unusedIndex: number){
        const startingIndex = unusedIndex > 0 ? unusedIndex - 1 : unusedIndex;
        const addressUsed = [];
        // 遍历索引下所有的钱包
        for (let i = 0; i <= startingIndex; i++) {
            const path = `m/44'/195'/0'/0/${i}`;
            const wallet = TronWeb.fromMnemonic(phrase, path);
            const walletWithDetails = {
                ...wallet,
                derivationPath: path
            };
            addressUsed.push(walletWithDetails)
        }
        return addressUsed
    }

    // 获取账户余额
    async getBalance(address: string){
        try {
            return this.tronWeb.trx.getBalance(address)
        }catch (err) {
            console.error("Error fetching balance:", err);
        }
    }

    // 确认交易是否成功
    async confirmTransaction(txHash: string){
        try {
            const result = await this.tronWeb.trx.getTransaction(txHash);
            if (result.ret[0].contractRet === 'SUCCESS'){
                return true
            }else {
                return false
            }
        }catch (err) {
            console.error("Error confirming Tron transaction:", err);
            return false
        }
    }

    // 根据私钥获取钱包
    getWalletPublicKey(privateKey: string){
        this.tronWeb.setPrivateKey(privateKey)
        return this.tronWeb.defaultAddress
    }

}


//@ts-ignore
const tronService = new TronService(process.env.EXPO_PUBLIC_Tron_URL, process.env.EXPO_PUBLIC_Tron_APIKEY)

export default tronService;
