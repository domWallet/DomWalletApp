
const usdtImg = require("@/assets/app/wallet/USDT-2 1.png")
const tusdImg = require("@/assets/app/wallet/TUSD.png")
const trxImg = require("@/assets/app/wallet/TRX.png")

const USDT = {
    name: 'Tether USD',
    symbol: 'USDT',
    address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', //TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
    decimals: 6,
    showDecimals: 2,
    icon: usdtImg,
}

const TUSD = {
    name: 'TrueUSD',
    symbol: 'TUSD',
    address: 'TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4',
    decimals: 18,
    showDecimals: 8,
    icon: tusdImg,
}

const TRX = {
    name: 'TRX',
    symbol: 'TRX',
    address: '',
    decimals: 6,
    showDecimals: 2,
    icon: trxImg,
}

export {TRX, USDT, TUSD}


