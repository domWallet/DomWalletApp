import {Image, ImageBase, SafeAreaView, StyleSheet, Text, View} from "react-native";
import "../i18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from  "react-native-responsive-screen";
import {useTranslation} from "react-i18next";
import {Platform} from "react-native";
import { calculateWidth, calculateHeight } from "@/utils/calculatedPercentage";
import {useEffect} from "react";
import {lightTheme} from "@/styles/global";
import MyButton from "@/components/Button";
import {Href, router} from "expo-router";
import Routes from "@/constant/routes";


const android = Platform.OS === "android";
const topImg = require("@/assets/app/create/bg1.png");

export default function Index() {
    const { t } = useTranslation()
    // <Text>{t('home:welcome')}</Text>

    const gotoTest = ()=>{
        // @ts-ignore
        router.push("/account/receiveTokens")
    }

    const goToImport = ()=>{
        // @ts-ignore
        router.push(Routes.importByMnemonic)
    }

    const gotoCreate = ()=>{
        // @ts-ignore
        router.push(Routes.createHit)
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.imageContainer}>
                <Image source={topImg} style={styles.imageTop}/>

                <MyButton
                    width={210}
                    height={60}
                    label="home:clickToLean"
                    labelSize={24}
                    labelWight={800}
                    labelColor={lightTheme.font_main_color}
                    bgColor={lightTheme.bg_main_color}
                    bdColor={lightTheme.border_main_color}
                    borderRadius={24}
                    onClick={gotoTest}
                />
            </View>

            <View style={styles.centerContainer}>
                <Text style={styles.centerInnerText1}>{t('home:welcomeToDom')}</Text>
                <Text style={styles.centerInnerText2}>{t('home:multiChain')}</Text>
            </View>

            <View style={styles.bottomBtnContainer}>
                <MyButton
                    width={630}
                    height={100}
                    label="home:createWallet"
                    labelSize={35}
                    labelWight={700}
                    labelColor={lightTheme.font_sub_color}
                    bgColor={lightTheme.bg_sub_color}
                    bdColor={lightTheme.bg_sub_color}
                    borderRadius={50}
                    onClick={gotoCreate}
                />

                <MyButton
                    width={630}
                    height={100}
                    label="home:importWallet"
                    labelSize={35}
                    labelWight={700}
                    labelColor={lightTheme.font_main_color}
                    bgColor={lightTheme.bg_main_color}
                    bdColor={lightTheme.bg_sub_color}
                    borderRadius={50}
                    onClick={goToImport}
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: android ? hp(5) : 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: lightTheme.bg_main_color,
    },
    imageContainer: {
        alignItems: "center",
        gap: calculateHeight(15),
    },
    imageTop: {
        width: calculateWidth(408),
        height: calculateHeight(466),
        marginTop: calculateHeight(102),
    },
    centerContainer: {
        alignItems: "center",
        gap: calculateHeight(20),
        marginTop: calculateHeight(111),
    },
    centerInnerText1: {
        fontSize: calculateWidth(50),
        fontWeight: 800,
        fontFamily: 'PingFang SC',
        lineHeight: calculateHeight(70),
        color: lightTheme.font_main_color,
    },
    centerInnerText2: {
        fontSize: calculateWidth(24),
        fontWeight: 600,
        fontFamily: 'PingFang SC',
        lineHeight: calculateHeight(34),
        color: lightTheme.font_main_color,
    },
    bottomBtnContainer: {
        alignItems: "center",
        marginTop: calculateHeight(134),
        gap: calculateHeight(40),
    },

})

