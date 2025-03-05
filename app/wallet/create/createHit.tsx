import "@/i18n";
import { calculateWidth, calculateHeight } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import DefaultHeader from "@/components/Header/defaultHeader";
import {Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {router} from "expo-router";
import {useTranslation} from "react-i18next";

const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");

const CreateHit =  () => {

    const {t} = useTranslation()
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
                />

                <View style={styles.inputContainer}>

                    <Text style={styles.inputTitle}>{t('create:generate')}</Text>

                    <Text style={styles.titleInfo}>{t('create:nextStep')}</Text>
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
    }
})


export default CreateHit;


