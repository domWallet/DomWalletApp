import TronService from "@/services/TronService";
import {usdt, tusd} from "@/constant/ABI/Tron/token";
import * as tokens from "@/constant/tokens";

const sendTrx  = async (fromAddress: string, toAddress: string, value: number) => {
    const tronweb = TronService.tronWeb
    let decimalValue = value * 10 ** 6
    const transaction = await tronweb.transactionBuilder.sendTrx(toAddress, decimalValue, fromAddress);
    try {
        const signedTransaction = await tronweb.trx.signTransaction(transaction)
        const result = await tronweb.trx.sendRawTransaction(signedTransaction)
        return result;
    }catch (err) {
        console.log("Transaction err:", err);
        throw new Error("Failed to send transaction. Please try again later.")
    }
}

const sendUSDT = async (fromAddress: string, toAddress: string, value: number, privateKey: string) => {
    const tronweb = TronService.tronWeb
    tronweb.setAddress(fromAddress)
    let decimalValue = value * 10 ** 6
    let contract = await tronweb.contract(usdt, tokens.USDT.address)
    tronweb.setPrivateKey(privateKey)
    try {
        const transaction = await contract.transfer(toAddress, decimalValue).send({
            feeLimit: 100_000_000,
            shouldPollResponse: true, // 默认为false，设置为true，将返回交易ID，并轮询获取交易结果
            keepTxID: true, // 默认为false，设置为true，将返回交易ID，并轮询获取交易结果
            pollTimes: 5, // 轮询次数，默认为5
        })
        return transaction
    }catch (error) {
        console.log("Transaction err:", error)
        return null
    }
}

const sendTUSD = async (fromAddress: string, toAddress: string, value: number, privateKey: string) => {
    const tronweb = TronService.tronWeb
    tronweb.setAddress(fromAddress)
    let decimalValue = value * 10 ** 18
    let contract = await tronweb.contract(tusd, tokens.TUSD.address)
    tronweb.setPrivateKey(privateKey)
    try {
        const transaction = await contract.transfer(toAddress, decimalValue).send({
            feeLimit: 100_000_000,
            shouldPollResponse: true, // 默认为false，设置为true，将返回交易ID，并轮询获取交易结果
            keepTxID: true, // 默认为false，设置为true，将返回交易ID，并轮询获取交易结果
            pollTimes: 5, // 轮询次数，默认为5
        })
        return transaction
    }catch (error) {
        console.log("Transaction err:", error)
        return null
    }
}








