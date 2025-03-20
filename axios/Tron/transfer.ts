import TronService from "@/services/TronService";
import {usdt, tusd} from "@/constant/ABI/Tron/token";
import * as tokens from "@/constant/tokens";
import {getNowTronResourcePrice} from "@/utils/tronwebUtils";

const Big = require("big.js")

const sendTrx  = async (fromAddress: string, toAddress: string, value: string, privateKey: string) => {
    const tronweb = TronService.tronWeb
    let decimalValue = new Big(value).times(new Big(Math.pow(10, 6)))
    tronweb.setPrivateKey(privateKey)
    const transaction = await tronweb.transactionBuilder.sendTrx(toAddress, decimalValue.toString(), fromAddress);
    let transactionId = ""
    let transactionRes = ""
    try {
        console.log("交易trx开始")
        const signedTransaction = await tronweb.trx.signTransaction(transaction)
        const result = await tronweb.trx.sendRawTransaction(signedTransaction)
        transactionId = result.txid
        console.log("交易trx结束:", transactionId)
        // transactionRes = await getTransactionRes(transactionId)
        return transactionId
    }catch (err) {
        console.log("Transaction err:", err);
        return transactionId
    }
}

const sendUSDT = async (fromAddress: string, toAddress: string, value: string, privateKey: string) => {
    const tronweb = TronService.tronWeb
    tronweb.setAddress(fromAddress)
    let decimalValue = new Big(value).times(new Big(Math.pow(10, 6)))
    let contract = await tronweb.contract(usdt, tokens.USDT.address)
    tronweb.setPrivateKey(privateKey)
    let transactionId = ""
    let transactionRes = ""
    try {
        const transaction = await contract.transfer(toAddress, decimalValue.toString()).send({
            feeLimit: 100_000_000,
        })
        transactionId = transaction
        // transactionRes = await getTransactionRes(transactionId)
        return transactionId
    }catch (error) {
        console.log("Transaction err:", error)
        return transactionId;
    }
}

const sendTUSD = async (fromAddress: string, toAddress: string, value: string, privateKey: string) => {
    const tronweb = TronService.tronWeb
    tronweb.setAddress(fromAddress)

    let decimalValue = new Big(value).times(new Big(Math.pow(10, 18)))
    let contract = await tronweb.contract(tusd, tokens.TUSD.address)

    tronweb.setPrivateKey(privateKey)
    let transactionId = ""
    let transactionRes = ""
    try {
        console.log("交易TUSD开始")
        const transaction = await contract.transfer(toAddress, decimalValue.toString()).send({
            feeLimit: 100_000_000,
        })
        console.log("TUSD交易结束:", transaction)
        transactionId = transaction
        // transactionRes = await getTransactionRes(transactionId)
        return transactionId;
    }catch (error) {
        console.log("Transaction err:", error)
        return transactionId;
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
    let currentBandWidthPrice = getNowTronResourcePrice(bandWidthPrice)

    // 计算 Bandwidth Cost (SUN)
    const bandwidthCostSun = needBandwidth * currentBandWidthPrice;
    let bandwidthCostTrx = bandwidthCostSun / 1000000
    return bandwidthCostTrx
}

// 获取发送trc20交易需要的手续费
const getSendTrc20Fee = async (to: string, amount: string, from: string, decimal: number, contractAddress: string) => {

    const tronweb = TronService.tronWeb
    let userRE = await getUserResource(from)

    let value = new Big(amount).times(new Big(Math.pow(10, decimal)))

    let parameter = [{type:'address',value:to},{type:'uint256',value:value.toString()}];

    const transaction = await tronweb.transactionBuilder.triggerSmartContract(contractAddress, "transfer(address,uint256)", {feeLimit: 100_000_000}, parameter, from)

    const size = JSON.stringify(transaction?.transaction).length
    const bandwidthCost = size * 1;
    let needBandwidth = bandwidthCost > userRE.netLimit ? bandwidthCost - userRE.netLimit : 0
    let bandWidthPrice = await tronweb.trx.getBandwidthPrices()
    let currentBandWidthPrice = getNowTronResourcePrice(bandWidthPrice)


    // 计算 Bandwidth Cost (SUN)
    const bandwidthCostSun = needBandwidth * currentBandWidthPrice;
    let bandwidthCostTrx = bandwidthCostSun / 1000000


    const transactionConstant    = await tronweb.transactionBuilder.triggerConstantContract(contractAddress, "transfer(address,uint256)", {feeLimit: 100_000_000}, parameter, from)
    let energyCost = transactionConstant?.energy_used

    // @ts-ignore
    let needEnergy = energyCost > userRE.energyLimit ? energyCost - userRE.energyLimit : 0
    let energyPrice = await tronweb.trx.getEnergyPrices()
    let currentEnergyPrice = getNowTronResourcePrice(energyPrice)


    // 计算 Energy Cost (SUN)
    const energyCostSun = needEnergy * currentEnergyPrice;

    // 将 SUN 转换为 TRX
    const energyCostTrx = energyCostSun / 1000000;
    let sum = energyCostTrx + bandwidthCostTrx
    return sum
}


const getUserResource = async (address: string)=>{
    const tronweb = TronService.tronWeb
    let res = await tronweb.trx.getAccountResources(address)
    let netLimit = 0
    let energyLimit = 0
    if (res?.NetLimit == null || res?.NetLimit == undefined){
        netLimit = res?.freeNetLimit
    }else {
        netLimit = res?.NetLimit
    }
    if (res?.EnergyLimit == null || res?.EnergyLimit == undefined){
        energyLimit = 0
    }else {
        energyLimit = res?.EnergyLimit
    }
    let userRE = {
        // 用户可用带宽
        netLimit: netLimit,
        // 用户可用能量
        energyLimit: energyLimit
    }
    return userRE
}

const getTransactionRes = async (transactionId: string)=>{
    const tronweb = TronService.tronWeb
    let receipt = await tronweb.trx.getTransaction(transactionId)
    let res = receipt.ret[0].contractRet
    return res
}


export {sendTrx, sendUSDT, sendTUSD, getTransactionRes, getSendTrxFee, getSendTrc20Fee}


