import {Platform, SafeAreaView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import WalletHeader from "@/components/wallet/Header";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import WalletCard from "@/components/wallet/AccountCard";
import ActionButton from "@/components/wallet/ActionButton";
import Tokens from "@/app/account/tokens";
import {useEffect, useState} from "react";
import Tabs from "@/components/Tabs";
import {useTokenStore} from "@/store/tokenStore";
import useAccountStore from "@/store/accountStore";
import {TRX, USDT, TUSD} from "@/constant/tokens"
import {getTokenPriceAndChanges, getTronPriceAndChanges} from "@/axios/http/tokenPrice";
import tokenInfo from "@/components/wallet/TokenInfo";
import {getTrxBalance, getTusdBalance, getUsdtBalance} from "@/axios/Tron/tokenBalance";
import {handleDecimal, handlePoint} from "@/utils/handleData";
import {router} from "expo-router";
import {getPhrase, getPrivateKey, getPrivateKeyIndexBound} from "@/utils/useStorageState";
import tronService from "@/services/TronService";

const android = Platform.OS === "android";
const Big = require("big.js")
const photo = require("@/assets/app/wallet/photo.png")
const send = require("@/assets/app/wallet/Sending.png")
const receive = require("@/assets/app/wallet/Receive.png")
const history = require("@/assets/app/wallet/History.png")
const other = require("@/assets/app/wallet/Other.png")

const titles = ["Currency", "NFT"]

const tokensInfos = [TRX, USDT, TUSD]

const Index = ()=>{


    const tokenStore = useTokenStore()
    const accountStore = useAccountStore()
    const [accountPrice, setAccountPrice] = useState("0")
    const [currentTokens, setCurrentTokens] = useState<any[]>([])


    const handleClick = async ()=>{
        // if (accountStore.accountAddress != ""){
        //     router.push("/account/receiveTokens")
        // }
        console.log("usdt")
        const address = accountStore.accountAddress
        console.log("address:", address)
        let usdtBalance = await getTusdBalance(address)
        console.log("usdtBalance:", usdtBalance)
    }

    const handleTransfer = async () => {
        console.log("trx")
        const address = accountStore.accountAddress
        console.log("address:", address)
        let trxBalance = await getTrxBalance(address)
        console.log("trxBalance:", trxBalance)
        // if (currentTokens.length > 0){
        //     // 确保数据请求完毕
        //     router.push("/account/selectToken")
        // }
    }

    useEffect(()=>{
        (async ()=>{
            await getAccountTokenPrice()
        })()
    }, [])


    useEffect(()=>{
        let sum = new Big(0)
        for (let i = 0; i < currentTokens.length; i++) {
            let temp = new Big(currentTokens[i].worth)
            sum = sum.plus(temp)
        }
        setAccountPrice(handlePoint(sum.toString(), 2))
    }, [currentTokens])


    const getAccountTokenPrice = async ()=>{
        const tokens: any[] = []
        const address = accountStore.accountAddress
        let tokenPriceRes = await getTokensPrice()
        let tokenAmount = await getAccountTokenBalance(address)
        for (let i = 0; i < tokensInfos.length; i++) {
            let usd
            let change
            let sign
            let balance
            if (tokensInfos[i]?.symbol === "TRX"){
                usd = tokenPriceRes?.rtx_res?.usd
                change = tokenPriceRes?.rtx_res?.usd_24h_change
            }else {
                let tokenPrices = tokenPriceRes?.tokens_res
                // @ts-ignore
                let res = tokenPrices[tokensInfos[i].address as string]
                usd = res?.usd
                change = res?.usd_24h_change
            }
            let amount = handleDecimal(tokenAmount[i], tokensInfos[i].decimals)
            let amount_big = new Big(amount.toString())
            let usd_big = new Big(usd)
            balance = amount_big.times(usd_big)
            balance = balance.toString()
            let index = balance.indexOf(".")
            // 保留两位小数
            balance = balance.substring(0, index + 3)
            let e_change = change

            usd = handlePoint(usd.toString(), 2)

            change = handlePoint(change.toString(), 4) + "%"

            if(parseFloat(e_change) > 0){
                sign = 1
                change = "+" + change
            }else if (parseFloat(e_change) < 0){
                sign = 2
            }else {
                sign = 0
            }

            let token = {
                address: tokensInfos[i].address,
                decimals: tokensInfos[i].decimals,
                icon: tokensInfos[i].icon,
                name: tokensInfos[i].symbol,
                showDecimals: tokensInfos[i].showDecimals,
                symbol: tokensInfos[i].symbol,
                price: usd,
                sign: sign,
                change: change,
                amount: handlePoint(amount.toString(), 2),
                worth: balance,
            }
            tokens.push(token)
        }
        tokenStore.setTokens(tokens)
        setCurrentTokens(tokens)
    }

    const getTokensPrice = async ()=>{
        let rtx_res = await getTronPriceAndChanges()
        let temp_address = `${USDT.address},${TUSD.address}`
        let tokens_res = await getTokenPriceAndChanges(temp_address)
        return { rtx_res, tokens_res }
    }

    const getAccountTokenBalance = async (address: string)=>{
        let res = []
        debugger
        let trxBalance = await getTrxBalance(address)
        debugger
        res.push(trxBalance)
        let usdtBalance = await getUsdtBalance(address)
        res.push(usdtBalance)
        let tusdBalance = await getTusdBalance(address)
        res.push(tusdBalance)
        return res
    }



    return (
        <>
            <SafeAreaView style={styles.container}>
                <WalletHeader />

                <View style={styles.cardContainer}>
                    <WalletCard imgPath={photo} accountName={accountStore.accountName} balance={accountPrice}/>
                </View>

                <View style={styles.actionContainer}>
                    <ActionButton imgPath={send} actionName={"Sending"} action={handleTransfer}/>

                    <ActionButton imgPath={receive} actionName={"Receive"} action={handleClick}/>

                    <ActionButton imgPath={history} actionName={"History"} action={()=>{
                        // @ts-ignore
                        router.push("/wallet/import/importByMnemonic")
                    }}/>

                    <ActionButton imgPath={other} actionName={"Other"} action={()=>{}}/>
                </View>

                <View style={styles.tabViewContainer}>
                    <Tabs titles={titles}>
                        <Tokens tokenInfos={currentTokens}/>
                        <Tokens tokenInfos={currentTokens}/>
                    </Tabs>
                </View>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: android ? hp(3) : 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: lightTheme.bg_main_color,
        paddingLeft: cw(30),
        paddingRight: cw(30),
    },
    cardContainer: {
        marginTop: ch(30),
        width: "100%",
        paddingRight: cw(30),
        paddingLeft: cw(30),
    },
    actionContainer: {
        width: "100%",
        marginTop:ch(62),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingLeft: cw(30),
        paddingRight: cw(30),
    },
    tabViewContainer: {
        width: "100%",
        height: "100%",
        marginTop: ch(30),
        paddingLeft: cw(30),
        paddingRight: cw(30),
    }
})

export default Index;

