import {Platform, SafeAreaView, StyleSheet, View} from "react-native";
import {calculateWidth as cw, calculateHeight as ch, calculateWidth} from "@/utils/calculatedPercentage";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import {useTranslation} from "react-i18next";
import {router} from "expo-router";
import DefaultHeader from "@/components/Header/defaultHeader";
import {useTokenStore} from "@/store/tokenStore";
import TokenLabel from "@/components/Label/tokenLabel";
import uuid from "react-native-uuid";
import Routes from "@/constant/routes";

const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");
const rightIcon = require("@/assets/app/find/more2.png");


const SelectToken = () => {

    const {t} = useTranslation();

    const tokenStore = useTokenStore();
    const tokens = tokenStore.tokens;

    const handleLeftClick = ()=>{
        router.back();
    }

    const handleTokenClick = (symbol: string) => {
        console.log(symbol)
        // @ts-ignore
        router.push('/account/transferToken' + `?symbol=${symbol}`)
    }

    return (
        <>
            <SafeAreaView style={styles.container}>

                {/*Header*/}
                <DefaultHeader
                    leftIcon={leftIcon}
                    leftIconWidth={18.74}
                    leftIconHeight={33.76}
                    info={"header:select"}
                    infoWight={600}
                    infoSize={30}
                    infoColor={lightTheme.font_main_color}
                    clickLeft={handleLeftClick}
                />

                <View style={styles.chooseContainer}>
                    {
                        tokens.map((token, index)=>{
                            return (
                                <TokenLabel
                                    key={uuid.v4()}
                                    width={690}
                                    height={80}
                                    leftIcon={token?.icon}
                                    leftIconWidth={71}
                                    leftIconHeight={71}
                                    topInfo={token?.symbol}
                                    bottomInfo={token?.amount}
                                    infoSize={28}
                                    infoWight={600}
                                    infoColor={lightTheme.font_main_color}
                                    rightIcon={rightIcon}
                                    rightIconWidth={10}
                                    rightIconHeight={18}
                                    clickFn={() => handleTokenClick(token?.symbol)}
                                />
                            )
                        })
                    }
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
    chooseContainer: {
        width: "100%",
        paddingLeft: calculateWidth(30),
        paddingRight: calculateWidth(30),
        marginTop: ch(40),
        gap: ch(60),
    }
})

export default SelectToken


