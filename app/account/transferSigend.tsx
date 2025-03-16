import { calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {Image, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import DefaultHeader from "@/components/Header/defaultHeader";
import {router, useLocalSearchParams} from "expo-router";
import {useTokenStore} from "@/store/tokenStore";
import {useTranslation} from "react-i18next";
import MyButton from "@/components/Button";
import {useEffect, useState} from "react";
import {sendTrx, sendTUSD, sendUSDT} from "@/axios/Tron/transfer";
import useAccountStore from "@/store/accountStore";

const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");
const send = require("@/assets/app/wallet/send.png");

const TransferSigend = () => {

    // received address、 amount、 symbol、 fee
    const params = useLocalSearchParams()
    const tokenStore = useTokenStore()
    const [selectToken, setSelectToken] = useState({})
    const accountStore = useAccountStore()

    const { t } = useTranslation()

    useEffect(()=>{
        let tokens = tokenStore.tokens
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].symbol === params?.symbol){
                setSelectToken(tokens[i])
                break
            }
        }
    }, [])

    const handleLeftClick = ()=>{
        router.back();
    }

    const handleTransfer = async () => {
        let fromAddress = accountStore.accountAddress
        let privateKey = accountStore.accountPrivateKey
        let amount = params?.amount as string
        let toAddress = params?.receive as string
        let symbol = params?.symbol
        let hash
        if (symbol === "TRX"){
            hash = await sendTrx(fromAddress, toAddress, amount, privateKey)
        }else if (symbol === "USDT"){
            hash = await sendUSDT(fromAddress, toAddress, amount, privateKey)
        }else if (symbol === "TUSD"){
            hash = await sendTUSD(fromAddress, toAddress, amount, privateKey)
        }
        // @ts-ignore
        router.push("/account/transferResult" + `?hash=${hash}&amount=${amount}&symbol=${symbol}&receive=${toAddress}`)
    }


    return (
        <>
            <SafeAreaView style={styles.container}>

                {/*Header*/}
                <DefaultHeader
                    leftIcon={leftIcon}
                    leftIconWidth={25}
                    leftIconHeight={42}
                    info={"header:beBeing"}
                    infoWight={600}
                    infoSize={30}
                    infoColor={lightTheme.font_main_color}
                    clickLeft={handleLeftClick}
                />

                <View style={styles.imgContainer}>
                    <Image source={send} style={{
                        width: cw(170),
                        height: ch(170),
                    }}/>
                </View>

                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>{params?.amount}</Text>
                    <Text style={styles.symbolText}>{params?.symbol}</Text>
                </View>

                <View style={styles.listContainer}>
                    <View style={styles.listItem}>
                        <Text style={styles.listItemText1}>{t('account:receiving')}</Text>
                        <Text style={styles.listItemText2}>{params?.receive}</Text>
                    </View>

                    <View style={styles.listItem}>
                        <Text style={styles.listItemText1}>{t('account:network')}</Text>
                        <Text style={styles.listItemText2}>{tokenStore.network}</Text>
                    </View>

                    <View style={styles.listItem}>
                        <Text style={styles.listItemText1}>{t('account:networkCharge')}</Text>
                        <Text style={styles.listItemText2}>{params?.fee}</Text>
                    </View>
                </View>

                <View style={styles.bottomBtn}>
                    <MyButton
                        width={630}
                        height={100}
                        label="account:confirm"
                        labelSize={35}
                        labelWight={700}
                        labelColor={lightTheme.font_sub_color}
                        bgColor={lightTheme.bg_sub_color}
                        bdColor={lightTheme.bg_sub_color}
                        borderRadius={50}
                        onClick={handleTransfer}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: android ? hp(3) : 0,
        height: "100%",
        backgroundColor: lightTheme.bg_main_color,
        alignItems: "center",
        paddingLeft: cw(30),
        paddingRight: cw(30),
    },
    imgContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: ch(50),
    },
    amountContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        gap: cw(5),
        alignItems: "flex-end",
        marginTop: ch(15),
    },
    amountText: {
        fontFamily: 'PingFang SC',
        fontSize: cw(60),
        fontWeight: 600,
        color: lightTheme.font_main_color,
    },
    symbolText: {
        fontFamily: 'PingFang SC',
        fontSize: cw(40),
        fontWeight: 600,
        color: lightTheme.font_main_color,
        marginBottom: ch(5),
    },
    listContainer: {
        width: "100%",
        paddingRight: cw(30),
        paddingLeft: cw(30),
        gap: ch(20),
        alignItems: "center",
        marginTop: ch(36),
    },
    listItem: {
        width: cw(691),
        borderWidth: 2,
        borderColor: lightTheme.border_main_color,
        borderRadius: 12,
        gap: ch(15),
        paddingLeft: cw(32),
        paddingRight: cw(28),
        paddingTop: ch(25),
        paddingBottom: ch(32),
    },
    listItemText1: {
        fontFamily: 'PingFang SC',
        fontSize: cw(28),
        fontWeight: 600,
        color: lightTheme.font_minor_color,
    },
    listItemText2: {
        fontFamily: 'PingFang SC',
        fontSize: cw(32),
        fontWeight: 600,
        color: lightTheme.font_main_color,
        flexWrap: "wrap"
    },
    bottomBtn: {
        width: "100%",
        alignItems: "center",
        marginTop: ch(250),
    }
})

export default TransferSigend



