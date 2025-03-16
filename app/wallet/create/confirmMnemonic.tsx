import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import "@/i18n";
import {
    calculateWidth as cw,
    calculateHeight as ch, calculateWidth, calculateHeight,
} from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import {router, useLocalSearchParams} from "expo-router";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import DefaultHeader from "@/components/Header/defaultHeader";
import {useTranslation} from "react-i18next";
import uuid from "react-native-uuid";
import TouchMnemonic from "@/components/create/touchMnemonic";
import MyButton from "@/components/Button";
import {useCallback, useEffect, useMemo, useState} from "react";
import {shuffleArray} from "@/utils/Array";

const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");

const ConfirmMnemonic = () => {

    const {t} = useTranslation()
    const { phrase } = useLocalSearchParams()

    const list = (phrase as string).split(" ")

    const [pressList, setPressList] = useState(
        [false, false, false, false, false, false, false, false, false, false, false, false]
    )
    const [displayList, setDisplayList] = useState(
        ["", "", "", "", "", "", "", "", "", "", "", ""]
    )

    const outOfList = useMemo(()=>{
        return shuffleArray(phrase)
    }, [])

    const handleLeftClick = ()=>{
        router.back();
    }

    const handlePressClick = (sign: any) => {
        let tem_mon = outOfList[sign]
        let temp = [...pressList]
        let tem_display_list = [...displayList]
        temp[sign] = true
        for (let i = 0; i < 12; i++){
            if (tem_display_list[i] === ""){
                tem_display_list[i] = tem_mon
                break
            }
        }
        setPressList(temp)
        setDisplayList(tem_display_list)
    }

    const handleReset = ()=>{
        setPressList([false, false, false, false, false, false, false, false, false, false, false, false])
        setDisplayList(["", "", "", "", "", "", "", "", "", "", "", ""])
    }

    const verifyOk = () => {
        for (let i = 0; i < 12; i++){
            if (displayList[i] != list[i]){
                return false
            }
        }
        return true
    }

    const handleOk = ()=>{
        if (verifyOk()){
            router.push("/(tabs)")
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
                    clickLeft={handleLeftClick}
                />

                <View style={styles.inputContainer}>
                    <Text style={styles.titleInfo}>{t('create:correct')}</Text>
                </View>

                <View style={styles.centreContainer}>
                    <View style={styles.mnemonicContainer} >

                        {
                            displayList.map((item, index)=>{
                                return (
                                    <View key={uuid.v4()} style={[styles.mnemonicItem, {
                                        borderColor: displayList[index] != "" && displayList[index] != list[index] ? lightTheme.font_warn_color : lightTheme.border_main_color
                                    }]}>
                                        <Text style={styles.itemSpan1}>{(index+1)}{" "}</Text>
                                        <Text style={styles.itemSpan2}>{item}</Text>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>


                <View style={styles.touchContainer}>
                    {
                        outOfList.map(
                            // @ts-ignore
                            (item, index)=>{
                                return <TouchMnemonic key={uuid.v4()} sign={pressList[index]} mnemonic={item} pressFn={()=>{
                                    if (!pressList[index]){
                                        handlePressClick(index)
                                    }
                                }}/>
                            })
                    }

                </View>

                <View style={styles.resetBtnContainer}>
                    <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                        <Text style={styles.resetBtnText}>{"reset"}</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.bottomBtn}>
                    <MyButton
                        width={630}
                        height={100}
                        label="create:ok"
                        labelSize={35}
                        labelWight={700}
                        labelColor={lightTheme.font_sub_color}
                        bgColor={lightTheme.bg_sub_color}
                        bdColor={lightTheme.bg_sub_color}
                        borderRadius={50}
                        onClick={handleOk}
                        disable={
                            displayList[0] != list[0] ||
                            displayList[1] != list[1] ||
                            displayList[2] != list[2] ||
                            displayList[3] != list[3] ||
                            displayList[4] != list[4] ||
                            displayList[5] != list[5] ||
                            displayList[6] != list[6] ||
                            displayList[7] != list[7] ||
                            displayList[8] != list[8] ||
                            displayList[9] != list[9] ||
                            displayList[10] != list[10] ||
                            displayList[11] != list[11]
                        }
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
    },
    inputContainer: {
        width: "100%",
        paddingLeft: cw(30),
    },
    titleInfo: {
        fontFamily: 'PingFang SC',
        width: cw(675),
        fontWeight: 400,
        fontSize: cw(24),
        lineHeight: ch(34),
        color: lightTheme.font_minor_color,
        flexWrap: "wrap"
    },
    centreContainer: {
        width: "100%",
        paddingLeft: calculateWidth(30),
        paddingRight: calculateWidth(30),
        marginTop: calculateHeight(50),
        paddingBottom: ch(52),
        borderBottomWidth: 8,
        borderColor: lightTheme.border_main_color,
    },
    mnemonicContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: calculateWidth(30),
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
    touchContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: cw(30),
        paddingRight: cw(30),
        paddingTop: ch(50),
        flexWrap: "wrap",
        gap: cw(7),
    },
    bottomBtn: {
        width: "100%",
        alignItems: "center",
        marginTop: calculateHeight(200),
    },
    resetBtnContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: calculateHeight(50),
    },
    resetBtn: {
        width: cw(150),
        height: ch(60),
        backgroundColor: lightTheme.font_main_color,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    resetBtnText: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: cw(30),
        lineHeight: ch(34),
        color: lightTheme.bg_main_color,
        textAlign: "center",
    }
})

export default ConfirmMnemonic;

