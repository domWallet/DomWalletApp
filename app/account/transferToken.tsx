import {calculateWidth as cw, calculateHeight as ch, calculateHeight} from "@/utils/calculatedPercentage";
import {Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {useEffect, useState, } from "react";
import {useTokenStore} from "@/store/tokenStore";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import DefaultHeader from "@/components/Header/defaultHeader";
import {useTranslation} from "react-i18next";
import {Debounce} from "@/utils/Functionutils";
import {verifyTronAddress} from "@/utils/verifyMnemonic";
import AmountInput from "@/components/AmountInput";
import MyButton from "@/components/Button";
import {isTrc10} from "@/axios/Tron/tokenBalance";
import {awaitExpression} from "@babel/types";
import {getSendTrc20Fee, getSendTrxFee} from "@/axios/Tron/transfer";
import useAccountStore from "@/store/accountStore";

const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");

const TransferToken = () => {

    const { symbol } = useLocalSearchParams()
    const tokenStore = useTokenStore()
    const [selectToken, setSelectToken] = useState({})
    const [address, setAddress] = useState("")
    const [amount, setAmount] = useState(0)
    const [addressFocus, setAddressFocus] = useState(false)
    const [addressError, setAddressError] = useState(false)
    const accountStore = useAccountStore()


    const {t} = useTranslation()

    useEffect(() => {
        let tokens = tokenStore.tokens
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].symbol === symbol){
                setSelectToken(tokens[i])
                break
            }
        }
    }, []);

    const handleLeftClick = ()=>{
        router.back();
    }

    const handleSend = async () => {
        if (address != "" && amount != 0 && addressError == false){
            // @ts-ignore 进入确认交易页面
            let tokenAddress = selectToken?.address
            // @ts-ignore
            let tokenSymbol = selectToken?.symbol
            // @ts-ignore
            let decimals = selectToken?.decimals
            let from = accountStore.accountAddress
            let costData
            if (isTrc10(tokenSymbol)){
                // 交易本地token
                costData = await getSendTrxFee(address, amount.toString(), from, decimals)
            }else {
                // 交易rc20token
                costData = await getSendTrc20Fee(address, amount.toString(), from, decimals, tokenAddress)
            }
        }
    }

    const verifyAddress = (text: string) => {
        let dou_ver = Debounce(verifyAndChangeState, 500)
        if (text == "" && address == ""){
            setAddressError(true)
        }else {
            dou_ver(text)
        }
    }

    const verifyAndChangeState = (text: string) => {
        let res = verifyTronAddress(text)
        if (res){
            setAddressError(false)
            setAddress(text)
        }else {
            setAddressError(true)
        }
    }

    return  (
        <>
            <SafeAreaView style={styles.container}>

                {/*Header*/}
                <DefaultHeader
                    leftIcon={leftIcon}
                    leftIconWidth={18.74}
                    leftIconHeight={33.76}
                    info={"header:sending"}
                    infoSize={30}
                    infoWight={600}
                    infoColor={lightTheme.font_main_color}
                    clickLeft={handleLeftClick}
                    showBottom={true}
                />

                <View style={styles.inputContainer}>

                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>{t('account:address')}</Text>

                        <Text style={[styles.warningText, {
                            opacity: addressError ?  1 : 0,
                        }]} >{t('transfer:warn')}</Text>
                        <TextInput
                            style={[styles.inputTextItem, {
                                borderColor: addressError ? lightTheme.font_warn_color : (addressFocus ? lightTheme.font_main_color : lightTheme.border_main_color),
                            }]}
                            placeholder={t('account:pleaseAddress')}
                            onChangeText={(text) => verifyAddress(text)}
                            placeholderTextColor={lightTheme.font_minor_color}
                            onFocus={() => setAddressFocus(true)}
                            onBlur={() => setAddressFocus(false)}
                        />
                    </View>

                    <View style={styles.inputItem}>
                        <Text style={[styles.inputTitle]}>{t('account:amount')}</Text>

                        <AmountInput
                            width={690}
                            height={94}
                            borderRadius={12}
                            inputSize={24}
                            inputWight={400}
                            inputColor={lightTheme.font_main_color}
                            amount={
                                // @ts-ignore
                                parseFloat(selectToken?.amount)
                            }
                            value={"account:pleaseAmount"}
                            changeValueFn={(value:any)=>setAmount(value)}
                            decimal={
                                // @ts-ignore
                                parseInt(selectToken?.decimals)
                            }
                        />
                    </View>
                </View>

                <View style={styles.tokenInfo}>
                    <Text style={styles.amountText}>
                        {t('account:balance')}: {
                        // @ts-ignore
                        selectToken?.amount
                    } {
                            // @ts-ignore
                            selectToken?.symbol
                        }
                    </Text>

                    <View style={styles.tokenImgContainer}>
                        <Image source={
                            // @ts-ignore
                            selectToken?.icon
                        } style={{
                            width: cw(40),
                            height: cw(40),
                        }}/>

                        <Text style={styles.tokenSymbol}>{
                            // @ts-ignore
                            selectToken?.symbol
                        }</Text>
                    </View>
                </View>

                <View style={styles.bottomBtn}>
                    <MyButton
                        width={630}
                        height={100}
                        label="header:sending"
                        labelSize={35}
                        labelWight={700}
                        labelColor={lightTheme.font_sub_color}
                        bgColor={lightTheme.bg_sub_color}
                        bdColor={lightTheme.bg_sub_color}
                        borderRadius={50}
                        onClick={handleSend}
                        disable={address == "" || amount == 0 || addressError }
                    />
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
    inputContainer:{
        width: "100%",
        gap: ch(50),
        alignItems: "center",
        marginTop: ch(40),
    },
    inputItem: {

    },
    inputTitle: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: cw(24),
        color: lightTheme.font_main_color,
        marginBottom: ch(30),
    },
    inputTextItem: {
        width: cw(690),
        height: ch(94),
        borderRadius: 12,
        paddingLeft: cw(30),
        paddingRight: cw(30),
        color: lightTheme.font_main_color,
        fontSize: cw(24),
        fontWeight: 400,
        borderWidth: 2
    },
    warningText:{
        marginRight: 'auto',
        marginBottom: ch(10),
        color: lightTheme.font_warn_color,
    },
    tokenInfo: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: cw(30),
        paddingRight: cw(30),
        marginTop: ch(10),
    },
    amountText:{
        fontFamily: 'PingFang SC',
        fontWeight: 400,
        fontSize: cw(24),
        color: lightTheme.font_minor_color,
    },
    tokenImgContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: cw(5)
    },
    tokenSymbol: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: cw(24),
        color: lightTheme.font_main_color,
    },
    bottomBtn: {
        width: "100%",
        alignItems: "center",
        marginTop: ch(450),
    }
})


export default TransferToken;





