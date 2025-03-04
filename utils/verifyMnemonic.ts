import bip39 from "bip39"



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
export function validateMnemonic(mnemonic: string) {
    const words = mnemonic.split(' ');
    const wordlist = bip39.wordlists.english; // 获取英语单词列表

    for (const word of words) {
        if (!wordlist.includes(word)) {
            return false; // 如果任何一个单词不在列表中，则返回 false
        }
    }

    return true; // 所有单词都在列表中，返回 true
}







