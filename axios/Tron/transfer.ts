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

// 获取发送交易的手续费
const getSendTrxFee = async (to: string, amount: string, from: string, decimal: number) => {
    const tronweb = TronService.tronWeb
    let userRE = await getUserResource(from)
    // 精度转换
    let value = new Big(amount).times(new Big(Math.pow(10, decimal)))
    const transaction = await tronweb.transactionBuilder.sendTrx(to, value, from);

    // 预估带宽消耗
    const size = JSON.stringify(transaction).length

    const bandwidthCost = size * 1;
    let needBandwidth = bandwidthCost > userRE.netLimit ? bandwidthCost - userRE.netLimit : 0
    let bandWidthPrice = await tronweb.trx.getBandwidthPrices()
    // @ts-ignore
    const bandwidthRatio = bandWidthPrice?.bandwidthPriceRatio;
    // 计算 Bandwidth Cost (SUN)
    const bandwidthCostSun = needBandwidth * bandwidthRatio;
    let bandwidthCostTrx = bandwidthCostSun / 1000000
    return bandwidthCostTrx
}

// 获取发送trc20交易需要的手续费
const getSendTrc20Fee = async (to: string, amount: string, from: string, decimal: number, contractAddress: string) => {
    const tronweb = TronService.tronWeb
    let userRE = await getUserResource(from)
    let value = new Big(amount).times(new Big(Math.pow(10, decimal)))

    let parameter = [{type:'address',value:to},{type:'uint256',value:value}];

    const transaction = await tronweb.transactionBuilder.triggerSmartContract(contractAddress, "transfer(address,uint256)", {feeLimit: 100_000_000}, parameter, from)

    const size = JSON.stringify(transaction).length
    const bandwidthCost = size * 1;
    let needBandwidth = bandwidthCost > userRE.netLimit ? bandwidthCost - userRE.netLimit : 0
    let bandWidthPrice = await tronweb.trx.getBandwidthPrices()
    // @ts-ignore
    const bandwidthRatio = bandWidthPrice?.bandwidthPriceRatio;
    // 计算 Bandwidth Cost (SUN)
    const bandwidthCostSun = needBandwidth * bandwidthRatio;
    let bandwidthCostTrx = bandwidthCostSun / 1000000


    const energyCost = await tronweb.transactionBuilder.estimateEnergy(contractAddress, "transfer(address,uint256)", {feeLimit: 100_000_000}, parameter, from)
    let needEnergy = energyCost.energy_required > userRE.energyLimit ? energyCost.energy_required - userRE.energyLimit : 0
    let energyPrice = await tronweb.trx.getEnergyPrices()
    // @ts-ignore
    const energyRatio = energyPrice?.energyPriceRatio;
    // 计算 Energy Cost (SUN)
    const energyCostSun = needEnergy * energyRatio;

    // 将 SUN 转换为 TRX
    const energyCostTrx = energyCostSun / 1000000;

    return bandwidthCostTrx + energyCostTrx
}


const getUserResource = async (address: string)=>{
    const tronweb = TronService.tronWeb
    let res = await tronweb.trx.getAccountResources(address)
    let userRE = {
        // 用户可用带宽
        netLimit: res?.NetLimit,
        // 用户可用能量
        energyLimit: res?.EnergyLimit
    }
    return userRE
}

const getTransactionRes = async (transactionId: string)=>{
    const tronweb = TronService.tronWeb
    let receipt = await tronweb.trx.getTransaction(transactionId)
    let res = receipt.ret[0].contractRet
    return res
}


export {sendTrx, sendUSDT, sendTUSD, getSendTrxFee, getSendTrc20Fee}


