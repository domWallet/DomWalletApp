const API_KEY = process.env.EXPO_PUBLIC_COINGECKO_API_KEY
const COINGECKO_API_URL = process.env.EXPO_PUBLIC_COINGECKO_API_URL

const getTronPriceAndChanges = async () => {
    const url = `${COINGECKO_API_URL}/simple/price?ids=tron&vs_currencies=usd&include_24hr_change=true`

    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': API_KEY as string}
    };

    let res = {
        usd: "0",
        usd_24h_change: "0"
    }
    try {
        let result = await fetch(url, options)
        let res_json = await result.json()
        res.usd = res_json?.tron?.usd
        res.usd_24h_change = res_json?.tron?.usd_24h_change
        return res
    }catch (err) {
        console.log("Error fetching tron price and changes: ", err)
        return res
    }
}

/*
*  addresses: 多个TRC20代币地址，以逗号分隔
* */
const getTokenPriceAndChanges = async (addresses: string) => {
    const url = `${COINGECKO_API_URL}/simple/token_price/tron?contract_addresses=${addresses}&vs_currencies=usd&include_24hr_change=true`


    const option = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': API_KEY as string,
        }
    }

    let res = {}
    try {
        let response = await fetch(url, option)
        let res_json = await response.json()
        res = res_json
    }catch (err) {
        console.log("Error fetching tron price and changes: ", err)
    }
    return res
}

export {getTronPriceAndChanges, getTokenPriceAndChanges}
