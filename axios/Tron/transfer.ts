import TronService from "@/services/TronService";
import {usdt, tusd} from "@/constant/ABI/Tron/token";
import * as tokens from "@/constant/tokens";

const Big = require("big.js")

const sendTrx  = async (fromAddress: string, toAddress: string, value: number, privateKey: string) => {
    const tronweb = TronService.tronWeb
    let decimalValue = new Big(value).times(new Big(Math.pow(10, 6)))
    tronweb.setPrivateKey(privateKey)
    const transaction = await tronweb.transactionBuilder.sendTrx(toAddress, decimalValue, fromAddress);
    let transactionId = ""
    let transactionRes = ""
    try {
        const signedTransaction = await tronweb.trx.signTransaction(transaction)
        const result = await tronweb.trx.sendRawTransaction(signedTransaction)
        transactionId = result.txid
        transactionRes = await getTransactionRes(transactionId)
        return {
            tx: transactionId,
            res: transactionRes
        };
    }catch (err) {
        console.log("Transaction err:", err);
        return {
            tx: transactionId,
            res: transactionRes
        }
    }
}

const sendUSDT = async (fromAddress: string, toAddress: string, value: number, privateKey: string) => {
    const tronweb = TronService.tronWeb
    tronweb.setAddress(fromAddress)
    let decimalValue = new Big(value).times(new Big(Math.pow(10, 6)))
    let contract = await tronweb.contract(usdt, tokens.USDT.address)
    tronweb.setPrivateKey(privateKey)
    let transactionId = ""
    let transactionRes = ""
    try {
        const transaction = await contract.transfer(toAddress, decimalValue).send({
            feeLimit: 100_000_000,
        })
        transactionId = transaction
        transactionRes = await getTransactionRes(transactionId)
        return {
            tx: transactionId,
            res: transactionRes
        };
    }catch (error) {
        console.log("Transaction err:", error)
        // @ts-ignore
        transactionRes = error.toString()
        return {
            tx: transactionId,
            res: transactionRes
        };
    }
}

const sendTUSD = async (fromAddress: string, toAddress: string, value: number, privateKey: string) => {
    const tronweb = TronService.tronWeb
    tronweb.setAddress(fromAddress)

    let decimalValue = new Big(value).times(new Big(Math.pow(10, 18)))
    let contract = await tronweb.contract(tusd, tokens.TUSD.address)

    tronweb.setPrivateKey(privateKey)
    let transactionId = ""
    let transactionRes = ""
    try {

        const transaction = await contract.transfer(toAddress, decimalValue.toString()).send({
            feeLimit: 100_000_000,
        })
        console.log("Transaction:", transaction)
        transactionId = transaction
        transactionRes = await getTransactionRes(transactionId)
        return {
            tx: transactionId,
            res: transactionRes
        };
    }catch (error) {
        console.log("Transaction err:", error)
        // @ts-ignore
        transactionRes = error.toString()
        return {
            tx: transactionId,
            res: transactionRes
        };
    }
}


const getTransactionRes = async (transactionId: string)=>{
    const tronweb = TronService.tronWeb
    let receipt = await tronweb.trx.getTransaction(transactionId)
    let res = receipt.ret[0].contractRet
    return res
}


export {sendTrx, sendUSDT, sendTUSD}


