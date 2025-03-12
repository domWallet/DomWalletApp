import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Platform} from "react-native";
import { calculateWidth, calculateHeight } from "@/utils/calculatedPercentage";
import { calculateWidth as cw, calculateHeight as ch } from "@/utils/calculatedPercentage";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import DefaultHeader from "@/components/Header/defaultHeader";
import {router} from "expo-router";
import {useTranslation} from "react-i18next";
import DefaultLabel from "@/components/Label";

const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");
const rightIcon = require("@/assets/app/find/more2.png")

const importWallet = require("@/assets/app/create/siyue 1.png");
const addWallet = require('@/assets/app/create/tianjiaqianbao 1.png')

const Choose = () => {

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
                    <Text style={styles.inputTitle}>
                        {t('import:add')}
                    </Text>
                </View>

                <View style={styles.chooseContainer}>
                    <DefaultLabel
                        width={690}
                        height={80}
                        leftIcon={importWallet}
                        leftIconWidth={40}
                        leftIconHeight={40}
                        labelInfo={t('home:importWallet')}
                        infoSize={30}
                        infoWight={600}
                        infoColor={lightTheme.font_main_color}
                        rightIcon={rightIcon}
                        rightIconWidth={10}
                        rightIconHeight={18}
                        clickFn={()=>{}}
                    />

                    <DefaultLabel
                        width={690}
                        height={80}
                        leftIcon={addWallet}
                        leftIconWidth={40}
                        leftIconHeight={40}
                        labelInfo={t('home:createWallet')}
                        infoSize={30}
                        infoWight={600}
                        infoColor={lightTheme.font_main_color}
                        rightIcon={rightIcon}
                        rightIconWidth={10}
                        rightIconHeight={18}
                        clickFn={()=>{}}
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
        justifyContent: "flex-start",
        backgroundColor: lightTheme.bg_main_color,
    },
    inputContainer: {
        width: "100%",
        gap: calculateHeight(40),
        paddingLeft: calculateWidth(30),
    },
    inputTitle: {
        fontFamily: 'PingFang SC',
        width: calculateWidth(472),
        fontWeight: 600,
        fontSize: calculateWidth(50),
        lineHeight: calculateHeight(70),
        flexWrap: "wrap",
    },
    chooseContainer: {
        width: "100%",
        paddingLeft: calculateWidth(30),
        paddingRight: calculateWidth(30),
        marginTop: ch(80),
        gap: ch(60),
    }
})

export default Choose;

