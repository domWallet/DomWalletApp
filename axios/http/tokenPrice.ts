import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_COINGECKO_API_KEY
const COINGECKO_API_URL = process.env.EXPO_PUBLIC_COINGECKO_API_URL
const http_url  = process.env.EXPO_PUBLIC_HTTP_DEFAULT


const getTronPriceAndChanges = async () => {
    const url = `${COINGECKO_API_URL}/simple/price?ids=tron&vs_currencies=usd&include_24hr_change=true`


    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': API_KEY as string}
    };

    let res = {
        usd: "0.212441",
        usd_24h_change: "-3.6675799903878357"
    }
    debugger
    // await checkInternationalAccess()
    // debugger
    try {
        debugger
        // let result = await fetch(url, options)
        debugger
        // console.log("result: ", result)
        // let res_json = await result.json()
        debugger
        // alert(`param1: ${res_json?.tron?.usd}`)
        // alert(`param2: ${res_json?.tron?.usd_24h_change}`)
        // res.usd = res_json?.tron?.usd
        // res.usd_24h_change = res_json?.tron?.usd_24h_change
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
    // const url = `${COINGECKO_API_URL}/simple/token_price/tron?contract_addresses=${addresses}&vs_currencies=usd&include_24hr_change=true`
    const url = "https://dom.xycrypto.xyz/api/api/token-price/tron?contract_addresses=${addresses}&vs_currencies=usd"

    const option = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': API_KEY as string,
        }
    }
    debugger
    let res = {
        TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t: {
            usd: 0.999879,
            usd_24h_change: -0.013304985391470025
        },
        TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4: {
            usd: 1.002,
            usd_24h_change: 0.23696777727956259
        }
    }
    // try {
    //     debugger
    //     let response = await fetch(url, option)
    //     debugger
    //     let res_json = await response.json()
    //     debugger
    //     res = res_json
    // }catch (err) {
    //     console.log("Error fetching tron price and changes: ", err)
    // }
    return res
}

async function checkInternationalAccess() {
    try {
        const response = await axios.get('https://www.google.com', {
            timeout: 10000, // 10 秒超时
        });
        alert(response.status)
        console.log('可以访问国外接口');
        return true;
    } catch (error) {
        // @ts-ignore
        if (error.code === 'ECONNABORTED') {
            console.log('请求超时，可能无法访问国外接口');
        } else {
            console.error('无法访问国外接口:', error);
        }
        return false;
    }
}

export {getTronPriceAndChanges, getTokenPriceAndChanges}
