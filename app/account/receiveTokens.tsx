import {lightTheme} from "@/styles/global";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {Platform, SafeAreaView, StyleSheet, TextInput, View, Text} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import QRCode from 'react-native-qrcode-svg';
import {useEffect, useState} from "react";
import DefaultHeader from "@/components/Header/defaultHeader";
import {router} from "expo-router";
import {useTranslation} from "react-i18next";
import MyButton from "@/components/Button";
import useAccountStore from "@/store/accountStore";

const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");
const copy = require("@/assets/app/create/niantie-2 1.png");
const share = require("@/assets/app/wallet/Share.png");

const ReceiveTokens = () => {

    const [qrValue, setQrValue] = useState('Dom Wallet');
    const accountStore = useAccountStore()
    const {t} = useTranslation()

    useEffect(()=>{
        setQrValue(accountStore.accountAddress)
    }, [])

    const handleLeftClick = ()=>{
        router.back();
    }

    return (
        <>
            <SafeAreaView style={styles.container}>

                {/*Header*/}
                <DefaultHeader
                    leftIcon={leftIcon}
                    leftIconWidth={18.74}
                    leftIconHeight={33.76}
                    clickLeft={handleLeftClick}
                    info={"header:receive"}
                    infoSize={30}
                    infoWight={600}
                    infoColor={lightTheme.font_main_color}
                    showBottom={true}
                />

                <Text style={styles.cenText}>{t('account:only')}</Text>

                <View style={styles.qrcodeContainer}>
                    <QRCode
                        value={qrValue}
                        size={150}
                        color="black"
                        backgroundColor="white"
                    />
                </View>

                <View style={styles.bottomInfo}>


                    <View style={styles.infoContainer}>
                        <Text style={styles.address}>{t("account:address")}</Text>
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressText}>{qrValue}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.actionBtnContainer}>
                    <MyButton
                        width={162}
                        height={60}
                        label={"account:paste"}
                        labelColor={lightTheme.font_main_color}
                        labelSize={24}
                        labelWight={800}
                        imgPath={copy}
                        imgWidth={26}
                        imgHeight={26}
                        gapDistance={10}
                        bgColor={lightTheme.bg_main_color}
                        bdColor={lightTheme.border_main_color}
                        onClick={()=>{}}
                        borderRadius={20}
                    />

                    <MyButton
                        width={162}
                        height={60}
                        label={"account:share"}
                        labelColor={lightTheme.font_main_color}
                        labelSize={24}
                        labelWight={800}
                        imgPath={share}
                        imgWidth={26}
                        imgHeight={26}
                        gapDistance={10}
                        bgColor={lightTheme.bg_main_color}
                        bdColor={lightTheme.border_main_color}
                        onClick={()=>{}}
                        borderRadius={20}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: lightTheme.bg_main_color,
        paddingTop: android ? hp(3) : 0,
        alignItems: "center",
    },
    cenText:{
        fontFamily: 'PingFang SC',
        fontSize: cw(24),
        fontWeight: 400,
        lineHeight: ch(34),
        color: lightTheme.font_minor_color,
        marginTop: ch(63),
    },
    qrcodeContainer: {
        marginTop: ch(18),
        width: cw(348),
        height: cw(348),
        alignItems: "center",
        justifyContent: "center",
    },
    bottomInfo:{
        width: "100%",
        paddingRight: cw(30),
        paddingLeft: cw(30),
        alignItems: "center",
        marginTop: ch(100)
    },
    infoContainer:{
        gap: ch(30),
    },
    address:{
        fontFamily: 'PingFang SC',
        fontSize: cw(24),
        fontWeight: "bold",
        lineHeight: ch(34),
        color: lightTheme.font_main_color,
    },
    addressContainer:{
        width:cw(690),
        height:ch(94),
        justifyContent: "center",
        borderWidth: 2,
        borderColor: lightTheme.border_main_color,
        borderRadius: 12,
    },
    addressText:{
        fontFamily: 'PingFang SC',
        fontSize: cw(24),
        fontWeight: 400,
        lineHeight: ch(34),
        color: lightTheme.font_minor_color,
        marginLeft: cw(31)
    },
    actionBtnContainer:{
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingLeft: cw(30),
        paddingRight: cw(30),
        marginTop: ch(68),
        flexDirection: "row",
        gap: cw(30),
    }
})


export default ReceiveTokens;



