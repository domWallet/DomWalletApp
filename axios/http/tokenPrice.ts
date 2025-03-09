
const API_KEY = process.env.EXPO_PUBLIC_COINGECKO_API_KEY
const COINGECKO_API_URL = process.env.EXPO_PUBLIC_COINGECKO_API_URL

const getTronPriceAndChanges = async () => {
    const url = `${COINGECKO_API_URL}/simple/price?ids=tron&vs_currencies=usd&include_24hr_change=true`

    const option = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'x-cg-demo-api-key': API_KEY,
        }
    }

    let res = {
        usd: "0",
        usd_24h_change: "0"
    }
    try {
        // @ts-ignore
        let response = await fetch(url, option)
        // @ts-ignore
        res.usd = response?.tron?.usd
        // @ts-ignore
        res.usd_24h_change = response?.tron?.usd_24h_change
    }catch (err) {
        console.error("Error fetching tron price and changes: ", err)
    }
    return res
}

/*
*  addresses: 多个TRC20代币地址，以逗号分隔
* */
const getTokenPriceAndChanges = async (addresses: string) => {
    const url = `${COINGECKO_API_URL}/simple/token_price/tron?contract_addresses=${addresses}&vs_currencies=usd&include_24hr_change=true`

    const option = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'x-cg-demo-api-key': API_KEY,
        }
    }

    let res = {}
    try {
        // @ts-ignore
        res = await fetch(url, option)
    }catch (err) {
        console.error("Error fetching tron price and changes: ", err)
    }
    return res
}


