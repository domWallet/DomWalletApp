import {Image, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import {useTranslation} from "react-i18next";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import {useEffect, useState} from "react";
import {formatAddress} from "@/utils/addressUtils";
import MyButton from "@/components/Button";
import {Link, router, useLocalSearchParams} from "expo-router";
import {getTransactionRes} from "@/axios/Tron/transfer";


const android = Platform.OS === "android";
const watingImg = require("@/assets/app/wallet/wating.png")
const success = require("@/assets/app/wallet/smile.png")
const failed = require("@/assets/app/wallet/frown.png")

const TransferResult = () => {

    const params = useLocalSearchParams()
    const {t} = useTranslation()
    const [state, setState] = useState("account:sending")
    const [transactionHash, setTransactionHash] = useState("")


    const WatingState = () => {

        const rotateValue = useSharedValue(0)

        useEffect(()=>{
            rotateValue.value = withRepeat(
                withTiming(rotateValue.value + 1, {
                    duration: 1000,
                    easing: Easing.linear,
                }),
                -1,
                false
            )
        }, [])

        const animatedStyle = useAnimatedStyle(() => {
            return {
                transform: [{rotate: `${rotateValue.value * 360}deg`}]
            }
        })

        return (
            <View style={styles.stateContainer}>
                <Animated.Image source={watingImg} style={[styles.stateImage, animatedStyle]} />

                <Text style={styles.stateText}>{t('account:beSending')}</Text>
            </View>
        )

    }

    const SuccessState = () => {

        return (
            <View style={styles.stateContainer}>
                <Image source={success} style={styles.stateImage} />

                <Text style={styles.stateText}>{t('account:success')}</Text>
            </View>
        )

    }

    const FailedState = () => {

        return (
            <View style={styles.stateContainer}>
                <Image source={failed} style={styles.stateImage} />

                <Text style={styles.stateText}>{t('account:failed')}</Text>
            </View>
        )

    }

    const getTopComponent = () => {
        if (state == "account:sending"){
            return <WatingState />
        }else if (state == "account:success"){
            return <SuccessState />
        }else {
            return <FailedState />
        }
    }

    useEffect(()=>{
        let hash = params?.hash as string
        let interval
        if (hash == ""){
            setState("account:failure")
        }else {
            (async () => {
                let res = await getTransactionRes(hash)
                console.log("res:", res)
                if (res == "SUCCESS"){
                    setState("account:success")
                }else {
                    setState("account:failure")
                }
                setTransactionHash(hash)
            })()
        }
    }, [])


    const handleClose = () => {
        router.push("/(tabs)")
    }

    return (
        <>
            <SafeAreaView style={styles.container}>

                <View style={styles.topContainer}>
                    {
                        getTopComponent()
                    }
                </View>

                <View style={styles.infoContainer}>

                    <Text style={styles.infoAmount}>{params?.amount}{" "}{params?.symbol}</Text>

                    <View style={styles.infoStateContainer}>
                        <Text style={styles.infoState}>{t(state)}</Text>
                    </View>

                    <Text style={styles.infoAddress}>{formatAddress(params?.receive as string, 8, 4)}</Text>

                    <Link
                        // @ts-ignore
                        href={"https://tronscan.org/#/transaction/" + transactionHash}
                        style={{
                            marginTop: ch(25),
                            opacity: transactionHash == "" ? 0 : 1
                        }}
                    >
                        <Text style={styles.link}>{t('account:view')}</Text>
                    </Link>
                </View>


                <View style={styles.bottomBtn}>
                    <MyButton
                        width={630}
                        height={100}
                        label="account:close"
                        labelSize={35}
                        labelWight={700}
                        labelColor={lightTheme.font_sub_color}
                        bgColor={lightTheme.bg_sub_color}
                        bdColor={lightTheme.bg_sub_color}
                        borderRadius={50}
                        onClick={handleClose}
                    />
                </View>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        paddingTop: android ? hp(3) : 0,
        height: "100%",
        backgroundColor: lightTheme.bg_main_color,
        alignItems: "center",
        paddingLeft: cw(30),
        paddingRight: cw(30),
    },
    topContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: ch(115),
    },
    stateContainer:{
        width: "100%",
        alignItems: "center",
        gap: ch(15)
    },
    stateImage:{
        width: cw(170),
        height: cw(170),
    },
    stateText:{
        fontSize: cw(60),
        fontWeight: 600,
        color: lightTheme.font_main_color
    },
    infoContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: ch(65),
    },
    infoAmount: {
        fontFamily: 'PingFang SC',
        fontSize: cw(40),
        fontWeight: 600,
        color: lightTheme.font_minor_color,
    },
    infoStateContainer: {
        paddingLeft: cw(34),
        paddingRight: cw(34),
        borderRadius: 12,
        backgroundColor: lightTheme.bg_state_color,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: ch(25),
    },
    infoState: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: cw(32),
        color: lightTheme.font_main_color,
    },
    infoAddress: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: cw(32),
        color: lightTheme.font_minor_color,
        marginTop: ch(25),
    },
    bottomBtn: {
        width: "100%",
        alignItems: "center",
        marginTop: ch(550),
    },
    link: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: cw(26),
        color: lightTheme.font_link_color,
        textDecorationLine: 'underline',
    }
})


export default TransferResult;





