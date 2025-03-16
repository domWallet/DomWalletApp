import {Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import "@/i18n";
import { calculateWidth, calculateHeight } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import DefaultHeader from "@/components/Header/defaultHeader";
import {router, useLocalSearchParams, useRouter} from "expo-router";
import {useTranslation} from "react-i18next";
import MyButton from "@/components/Button";
import uuid from 'react-native-uuid';
import Routes from "@/constant/routes";
import {useEffect} from "react";

const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");

const GenerateMnemonic = () => {

    const {t} = useTranslation()
    const { phrase } = useLocalSearchParams()

    const list = (phrase as string).split(" ")

    const handleLeftClick = ()=>{
        router.back();
    }

    const handelNextClick = ()=>{
        //@ts-ignore
        router.push(Routes.confirmMnemonic + `?phrase=${phrase}`)
    }

    return (
        <>
            <SafeAreaView style={styles.container}>

                {/*Header*/}
                <DefaultHeader
                    leftIcon={leftIcon}
                    leftIconWidth={25}
                    leftIconHeight={42}
                    clickLeft={handleLeftClick}
                />

                <View style={styles.inputContainer}>
                    <Text style={styles.titleInfo}>{t('create:mnemonic')}</Text>
                </View>

                <View style={styles.centreContainer}>
                    <Text style={styles.centreText}>{t('create:clear')}</Text>

                    <View style={styles.mnemonicContainer} >

                        {
                            list.map((item, index)=>{
                                return (
                                    <View key={uuid.v4()} style={styles.mnemonicItem}>
                                        <Text style={styles.itemSpan1}>{(index+1)}{" "}</Text>
                                        <Text style={styles.itemSpan2}>{item}</Text>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>

                <View style={styles.warnContainer}>

                    <Text style={[styles.warnItem, {
                        marginBottom: calculateHeight(14)
                    }]}>{"!!!:"}</Text>

                    <Text style={styles.warnItem}>
                        {t('create:please')}
                    </Text>

                    <Text style={styles.warnItem}>
                        {t('create:once')}
                    </Text>

                    <Text style={styles.warnItem}>
                        {t('create:backup')}
                    </Text>

                    <Text style={styles.warnItem}>
                        {t('create:uninstall')}
                    </Text>
                </View>

                <View style={styles.bottomBtn}>
                    <MyButton
                        width={630}
                        height={100}
                        label="create:next"
                        labelSize={35}
                        labelWight={700}
                        labelColor={lightTheme.font_sub_color}
                        bgColor={lightTheme.bg_sub_color}
                        bdColor={lightTheme.bg_sub_color}
                        borderRadius={50}
                        onClick={handelNextClick}
                        disable={false}
                    />
                </View>

            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: lightTheme.bg_main_color,
        paddingTop: android ? hp(3) : 0,
    },
    inputContainer: {
        width: "100%",
        paddingLeft: calculateWidth(30),
    },
    titleInfo: {
        fontFamily: 'PingFang SC',
        width: calculateWidth(675),
        fontWeight: 400,
        fontSize: calculateWidth(24),
        lineHeight: calculateHeight(34),
        color: lightTheme.font_minor_color,
        flexWrap: "wrap"
    },
    centreContainer: {
        width: "100%",
        paddingLeft: calculateWidth(30),
        paddingRight: calculateWidth(30),
        marginTop: calculateHeight(50),
    },
    centreText: {
        fontFamily: 'PingFang SC',
        fontWeight: 700,
        fontSize: calculateWidth(26),
        lineHeight: calculateHeight(34),
    },
    mnemonicContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: calculateHeight(50),
        gap: calculateWidth(25),
        justifyContent: "space-between"
    },
    mnemonicItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: calculateWidth(20),
        width: calculateWidth(210),
        height: calculateHeight(58),
        borderWidth: 1,
        borderColor: lightTheme.border_main_color,
        borderRadius: 5,
    },
    itemSpan1: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: calculateWidth(24),
        lineHeight: calculateHeight(34),
        color: lightTheme.font_minor_color,
    },
    itemSpan2: {
        fontFamily: 'PingFang SC',
        fontWeight: 800,
        fontSize: calculateWidth(24),
        lineHeight: calculateHeight(34),
        color: lightTheme.font_main_color,
    },
    warnContainer: {
        width: calculateWidth(682),
        paddingLeft: calculateWidth(30),
        paddingRight: calculateWidth(30),
        marginTop: calculateHeight(225),
    },
    warnItem: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: calculateWidth(20),
        lineHeight: calculateHeight(28),
        color: lightTheme.font_warn_color,
    },
    bottomBtn: {
        width: "100%",
        alignItems: "center",
        marginTop: calculateHeight(75),
    }
})


export default GenerateMnemonic


