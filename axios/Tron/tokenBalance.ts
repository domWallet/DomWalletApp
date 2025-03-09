import { usdt, tusd } from "@/constant/ABI/Tron/token"
import TronService from "@/services/TronService"
import * as tokens from "@/constant/tokens"

const getUsdtBalance = async (address: string) => {
    const tronweb = TronService.tronWeb
    let instance = await tronweb.contract(usdt, tokens.USDT.address)
    let res = await instance.balanceOf(address).call()
    return res
}


const getTusdBalance = async (address: string) => {
    const tronweb = TronService.tronWeb
    let instance = await tronweb.contract(tusd, tokens.TUSD.address)
    let res = await instance.balanceOf(address).call()
    return res
}


const getTrxBalance = async (address: string) => {
    const tronweb = TronService.tronWeb
    let res = await tronweb.trx.getBalance(address)
}





