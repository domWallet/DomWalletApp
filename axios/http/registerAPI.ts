import {info} from "expo/build/devtools/logger";

const defaultURL = process.env.EXPO_PUBLIC_HTTP_DEFAULT

const getAuthCodeApi = async (emailAddress: string) => {
    const url = `${defaultURL}/user/sendEmailCode`

    let Header = new Headers();
    Header.append("Content-Type", "application/json");

    let param = JSON.stringify({
        "email": emailAddress
    })


    let options = {
        method: 'POST',
        headers: Header,
        body: param
    }

    // @ts-ignore
    let response = await fetch(url, options)

   return response
}


const loginApi = async (emailAddress: string, authCode: string) => {
    const url = `${defaultURL}/user/login`

    let Header = new Headers();
    Header.append("Content-Type", "application/json");

    let param = JSON.stringify({
        "email": emailAddress,
        "code": authCode
    })

    let options = {
        method: 'POST',
        headers: Header,
        body: param
    }

    const response = await fetch(url, options)
    const res = await response.text()
    let res_obj = JSON.parse(res)
    return res_obj?.data?.access_token
}




export {getAuthCodeApi, loginApi}


