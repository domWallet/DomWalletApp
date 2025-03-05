

const url = "https://api.trongrid.io/v1/"
const API_KEY = process.env.EXPO_PUBLIC_Tron_APIKEY;
const getTransactionIDHistory = async (address: string, fingerprint: string) => {
    const options = {method: 'GET', headers: {
            "Content-Type": 'application/json',
            "TRON-PRO-API-KEY": API_KEY,
        }};
    let fetch_URL = `${url}accounts/${address}/transactions?only_confirmed=true&limit=10`
    if (fingerprint != ""){
        fetch_URL += `&fingerprint=${fingerprint}`
    }
    // @ts-ignore
    const res:any = await fetch(fetch_URL, options)
    if (res?.success){
        let tep_fingerprint:string = res?.meta?.fingerprint
        let txIds: any = []
        res?.data.forEach((tx: any) => {
            txIds.push(tx?.txID)
        })
        return{ txIds, tep_fingerprint}
    }else {
        console.log("Failed to get transaction history IDs:" + res)
        return {txIds: [], tep_fingerprint: ""}
    }
}



export { getTransactionIDHistory }
