import {Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import DefaultHeader from "@/components/Header/defaultHeader";
import {router} from "expo-router";
import DefaultSearch from "@/components/Search/defaultSearch";
import {useTranslation} from "react-i18next";
import Tabs from "@/components/Tabs";
import CurrencyPage from "@/app/market/currencyPage";
import {useEffect, useState} from "react";
import {getTokenPriceAndChanges, getTronPriceAndChanges} from "@/axios/http/tokenPrice";
import {formatAllPrice} from "@/utils/formatUtils";


const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");

const Market = () => {

    const { t } = useTranslation()
    const [tokens, setTokens] = useState<any>([])

    // TUSD BTC ETH SOL BitLayer
    const tokenAddressList = ["TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4", "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9", "THb4CqiFdwNHsWsQCs4JhzwjMWys4aqCbF", "TQYuR8FpmhMJK3ZpfoTgERjaZRywqMnFAH"]
    const symbols = ["TUSD", "BTC", "ETH", "PAYN"]

    const handleLeftClick = ()=>{
        router.back();
    }

    useEffect(() => {
        (async  () => {
            await getTokenList()
        })()
    }, []);

    const getTokenList = async () => {
        let tempList = []
        let trxInfo = await getTronPriceAndChanges()
        let trxChange = formatPercentage(trxInfo.usd_24h_change)
        tempList.push({
            symbol: "TRX",
            price: formatAllPrice(parseFloat(trxInfo.usd)),
            change: trxChange.change,
            sign: trxChange.sign
        })

        let sumAddress = ""
        for (let i = 0; i < tokenAddressList.length; i++) {
            if (i == 0 && sumAddress == ""){
                sumAddress = tokenAddressList[i]
            }else {
                sumAddress = sumAddress + "," + tokenAddressList[i]
            }
        }

        let res = await getTokenPriceAndChanges(sumAddress)
        tokenAddressList.forEach((item, index) => {
            let token = {
                symbol: "",
                price: "",
                change: "",
                sign: "0"
            }
            // @ts-ignore
            let tokenInfo = res[tokenAddressList[index]]
            token.symbol = symbols[index]
            token.price = formatAllPrice(parseFloat(tokenInfo?.usd))
            let tokenChange = formatPercentage(tokenInfo?.usd_24h_change)
            token.change = tokenChange?.change
            token.sign = tokenChange?.sign
            tempList.push(token)
        })
        setTokens(tempList)
    }


    const formatPercentage = (num: string) => {
        let temp_num = parseFloat(num)
        let format_num = temp_num.toFixed(2)
        if (temp_num > 0){
            return {
                change: `+${format_num}%`,
                sign: "1"
            }
        } else if (temp_num < 0) {
            return {
                change: format_num + "%",
                sign: "2"
            }
        }else {
            return {
                change: format_num + "%",
                sign: "0"
            }
        }
    }



    return (
        <>
            <SafeAreaView style={styles.container}>

                {/*Header*/}
                <DefaultHeader
                    leftIcon={leftIcon}
                    leftIconWidth={25}
                    leftIconHeight={42}
                    info={"header:search"}
                    infoWight={600}
                    infoSize={30}
                    infoColor={lightTheme.font_main_color}
                    clickLeft={handleLeftClick}
                />

                <View style={styles.searchContainer}>
                    <DefaultSearch
                        placeInfo={"market:please"}
                        inputFn={(text:any) => {console.log(text)}}
                    />
                </View>

                <View style={styles.tabViewContainer}>
                    <Tabs
                        titles={[t('market:optional'), t('market:market')]}
                    >
                        <CurrencyPage tokenList={tokens}/>
                        <CurrencyPage tokenList={tokens}/>
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
    },
    searchContainer:{
        width: "100%",
        paddingRight: cw(30),
        paddingLeft: cw(30),
        marginTop: ch(45),
    },
    tabViewContainer: {
        width: "100%",
        height: "100%",
        marginTop: ch(30),
        paddingLeft: cw(30),
        paddingRight: cw(30),
    }
})

export default Market

