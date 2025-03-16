
const Big = require('big.js')

export const handleDecimal = (balance: number | bigint, decimals: number)=>{
    let res = new Big(balance).div(new Big(Math.pow(10, decimals)))
    return res.toString()
}

export const handleShowDecimal = (balance: number | bigint, showDecimals: number)=>{
    let res = BigInt(balance).toString()
    let index = res.indexOf(".")
    res = res.substring(0, index + showDecimals + 1)
    return res
}


export const handlePoint = (num: string, point: number)=>{
    let index = num.indexOf(".")
    let res = num.substring(0, index + point + 1)
    return res
}
