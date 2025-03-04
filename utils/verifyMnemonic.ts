import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

// 验证助记词是否合法(满足12或24个助记词)
export function verifyMnemonic(mnemonic: string): boolean {
    const mnemonicRegex = /^([a-z]+\s){11}[a-z]+$|^([a-z]+\s){23}[a-z]+$/;
    return mnemonicRegex.test(mnemonic);
}

// 验证是否是合法私钥(ETH)
export function verifyPrivateKey(privateKey: string): boolean {
    const privateKeyRegex = /^[0-9a-fA-F]{64}$/;
    return privateKeyRegex.test(privateKey);
}

// 验证助记词是否是BIP39规定的单词
export function validateBipMnemonic(mnemonic: string) {
    console.log("validateBipMnemonic:", mnemonic)
    let res = bip39.validateMnemonic(mnemonic, wordlist)
    console.log("res:", res)
    return res;
}

// 验证助记词或私钥是否合法
export function validateMnemonicOrPrivateKey(message: string) {
    if (verifyPrivateKey(message)) {
        return {
            isValid: true,
            type: "privateKey"
        }
    }else if (verifyMnemonic(message)) {
        if (validateBipMnemonic(message)) {
            return {
                isValid: true,
                type: "mnemonic"
            }
        }
    }else {
        return {
            isValid: false,
            type: ""
        }
    }
}





