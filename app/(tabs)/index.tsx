import {Platform, SafeAreaView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import WalletHeader from "@/components/wallet/Header";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import WalletCard from "@/components/wallet/AccountCard";
import ActionButton from "@/components/wallet/ActionButton";
import Tokens from "@/app/account/tokens";
import {useState} from "react";
import Tabs from "@/components/Tabs";

const android = Platform.OS === "android";

const photo = require("@/assets/app/wallet/photo.png")
const send = require("@/assets/app/wallet/Sending.png")
const receive = require("@/assets/app/wallet/Receive.png")
const history = require("@/assets/app/wallet/History.png")
const other = require("@/assets/app/wallet/Other.png")

const titles = ["Currency", "NFT"]
const tokenImage = require("@/assets/app/wallet/USDT-2 1.png")

const tokenInfos = [
    {
        icon: tokenImage,
        name: "USDT",
        price: "3375.03",
        change: "+4.62%",
        sign: 1,
        amount: "23"
    },
    {
        icon: tokenImage,
        name: "USDT",
        price: "3375.03",
        change: "+4.62%",
        sign: 1,
        amount: "23"
    },
    {
        icon: tokenImage,
        name: "USDT",
        price: "3375.03",
        change: "+4.62%",
        sign: 2,
        amount: "23"
    },
    {
        icon: tokenImage,
        name: "USDT",
        price: "3375.03",
        change: "+4.62%",
        sign: 2,
        amount: "23"
    }
]

const Wallet = ()=>{

    const [tabIndex, setTabIndex] = useState(0)
    const layout = useWindowDimensions();

    const handleClick = ()=>{
        console.log("click")
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <WalletHeader />

                <View style={styles.cardContainer}>
                    <WalletCard imgPath={photo} accountName={"account: 1"} balance={"100.23"}/>
                </View>

                <View style={styles.actionContainer}>
                    <ActionButton imgPath={send} actionName={"Sending"} action={handleClick}/>

                    <ActionButton imgPath={receive} actionName={"Receive"} action={handleClick}/>

                    <ActionButton imgPath={history} actionName={"History"} action={handleClick}/>

                    <ActionButton imgPath={other} actionName={"Other"} action={handleClick}/>
                </View>

                <View style={styles.tabViewContainer}>
                    <Tabs titles={titles}>
                        <Tokens tokenInfos={tokenInfos}/>
                        <Tokens tokenInfos={tokenInfos}/>
                    </Tabs>
                </View>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: android ? hp(5) : 0,
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

export default Wallet;

