import { usdt, tusd } from "@/constant/ABI/Tron/token"
import TronService from "@/services/TronService"
import * as tokens from "@/constant/tokens"

const getUsdtBalance = async (address: string) => {
    const tronweb = TronService.tronWeb
    tronweb.setAddress(address)
    debugger
    let instance = await tronweb.contract(usdt, tokens.USDT.address)
    debugger
    let res = await instance.balanceOf(address).call() // 返回的是一个bigInt
    return res
}


const getTusdBalance = async (address: string) => {
    const tronweb = TronService.tronWeb
    tronweb.setAddress(address)
    debugger
    let instance
    let res
    try {
        instance = await tronweb.contract(tusd, tokens.TUSD.address)
        console.log("instance：", instance)
        res = await instance.balanceOf(address).call() // 返回的是一个bigInt
        console.log("res:", res)
    }catch (error) {
        console.log("request error:", error);
    }
    // let instance = await tronweb.contract(tusd, tokens.TUSD.address)
    // debugger
    // let res = await instance.balanceOf(address).call()
    return res
}


const getTrxBalance = async (address: string) => {
    const tronweb = TronService.tronWeb
    debugger
    let res;
    try {
        res = await tronweb.trx.getBalance(address)
    }catch (error) {
        console.log("request error:", error);
    }
    // let res = await tronweb.trx.getBalance(address)
    debugger
    return res
}

const isTrc10 = (symbol: any) => {
    return symbol == "TRX"
}


export {getUsdtBalance, getTusdBalance, getTrxBalance, isTrc10}


