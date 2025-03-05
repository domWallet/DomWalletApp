import {Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import "@/i18n";
import { calculateWidth, calculateHeight } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import DefaultHeader from "@/components/Header/defaultHeader";
import {router} from "expo-router";
import {useTranslation} from "react-i18next";

const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");

const GenerateMnemonic = () => {

    const {t} = useTranslation()

    const list = ["draft", "lonely", "science", "fly", "law", "orphan", "science", "basic", "mechanic", "beyond", "pilot", "acoustic"]

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
                    <Text style={styles.titleInfo}>{t('create:mnemonic')}</Text>
                </View>

                <View style={styles.centreContainer}>
                    <Text style={styles.centreText}>{t('create:clear')}</Text>

                    <View style={styles.mnemonicContainer}>

                        {
                            list.map((item, index)=>{
                                return (
                                    <>
                                        <View style={styles.mnemonicItem}>
                                            <Text style={styles.itemSpan1}>{(index+1)}{" "}</Text>
                                            <Text style={styles.itemSpan2}>{item}</Text>
                                        </View>
                                    </>
                                )
                            })
                        }



                    </View>
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
        paddingTop: android ? hp(5) : 0,
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
        gap: calculateWidth(30),
        justifyContent: "space-between"
    },
    mnemonicItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: calculateWidth(20),
        width: calculateWidth(210),
        height: calculateHeight(58),
        marginBottom: calculateHeight(10),
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
    }
})


export default GenerateMnemonic


