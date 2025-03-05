import "@/i18n";
import { calculateWidth, calculateHeight } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import DefaultHeader from "@/components/Header/defaultHeader";
import {Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {router} from "expo-router";
import {useTranslation} from "react-i18next";
import Label from "@/components/create/label";
import {useState} from "react";
import MyButton from "@/components/Button";
import Routes from "@/constant/routes";

const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");

const CreateHit =  () => {

    const {t} = useTranslation()
    const [submit, setSubmit] = useState([true, true, true])

    const handleLeftClick = ()=>{
        router.back();
    }


    const handelNextClick = ()=>{
        //@ts-ignore
        router.push(Routes.generateMnemonic)
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
                />

                <View style={styles.inputContainer}>

                    <Text style={styles.inputTitle}>{t('create:generate')}</Text>

                    <Text style={styles.titleInfo}>{t('create:nextStep')}</Text>
                </View>

                <View style={styles.labelContainer}>
                    <Label info={"create:lose"} clickFn={()=>{
                        const temp = [...submit]
                        temp[0] = !temp[0]
                        setSubmit(temp)
                    }}/>

                    <Label info={"create:disclose"} clickFn={()=>{
                        const temp = [...submit]
                        temp[1] = !temp[1]
                        setSubmit(temp)
                    }}/>

                    <Label info={"create:responsibility"} clickFn={()=>{
                        const temp = [...submit]
                        temp[2] = !temp[2]
                        setSubmit(temp)
                    }}/>
                </View>

                <View style={styles.confirmBtnContainer}>
                    <MyButton
                        width={630}
                        height={100}
                        label="create:generate"
                        labelSize={35}
                        labelWight={700}
                        labelColor={lightTheme.font_sub_color}
                        bgColor={lightTheme.bg_sub_color}
                        bdColor={lightTheme.bg_sub_color}
                        borderRadius={50}
                        onClick={handelNextClick}
                        disable={submit[0] || submit[1] || submit[2]}
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
        paddingTop: android ? hp(5) : 0,
    },
    inputContainer:{
        width: "100%",
        gap: calculateHeight(30),
        paddingLeft: calculateWidth(30),
    },
    inputTitle: {
        fontFamily: 'PingFang SC',
        width: calculateWidth(500),
        fontWeight: 600,
        fontSize: calculateWidth(50),
        lineHeight: calculateHeight(70),
        flexWrap: "wrap",
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
    labelContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: calculateHeight(52),
        gap: calculateHeight(30)
    },
    confirmBtnContainer:{
        width: "100%",
        alignItems: "center",
        marginTop: calculateHeight(284),
    }
})


export default CreateHit;


