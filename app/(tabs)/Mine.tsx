import {Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import PersonalCard from "@/components/Mine/personalCard";
import {calculateWidth as cw, calculateHeight as ch, calculateHeight} from "@/utils/calculatedPercentage";
import DefaultLabel from "@/components/Label";
import MyButton from "@/components/Button";
import {router} from "expo-router";


const android = Platform.OS === "android";
const photo = require("@/assets/app/wallet/photo.png")
const more = require("@/assets/app/mine/more.png")
const kyc = require("@/assets/app/mine/audit2x.png")
const earth = require("@/assets/app/mine/earth2x.png")
const crown = require("@/assets/app/mine/crown2x.png")
const logout = require("@/assets/app/mine/logout2x.png")

const Mine = () => {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <PersonalCard photoPath={photo} userName={"Anthony Perez"} UID={"2816492"}/>

                <View style={styles.centreBorder}></View>

                <View style={styles.optionContainer}>
                    <DefaultLabel
                        width={690}
                        height={80}
                        leftIcon={kyc}
                        leftIconWidth={50}
                        leftIconHeight={50}
                        labelInfo={'mine:kyc'}
                        infoSize={30}
                        infoWight={600}
                        infoColor={lightTheme.font_main_color}
                        rightIcon={more}
                        rightIconWidth={10}
                        rightIconHeight={18}
                        clickFn={()=>{}}
                    />

                    <DefaultLabel
                        width={690}
                        height={80}
                        leftIcon={earth}
                        leftIconWidth={50}
                        leftIconHeight={50}
                        labelInfo={'mine:language'}
                        infoSize={30}
                        infoWight={600}
                        infoColor={lightTheme.font_main_color}
                        rightIcon={more}
                        rightIconWidth={10}
                        rightIconHeight={18}
                        clickFn={()=>{
                            // @ts-ignore
                            router.push("mine/languageChoose")
                        }}
                    />

                    <DefaultLabel
                        width={690}
                        height={80}
                        leftIcon={crown}
                        leftIconWidth={50}
                        leftIconHeight={50}
                        labelInfo={'mine:about'}
                        infoSize={30}
                        infoWight={600}
                        infoColor={lightTheme.font_main_color}
                        rightIcon={more}
                        rightIconWidth={10}
                        rightIconHeight={18}
                        clickFn={()=>{}}
                    />
                </View>

                <View style={styles.confirmBtnContainer}>
                    <MyButton
                        width={630}
                        height={100}
                        label="mine:logout"
                        labelSize={35}
                        labelWight={700}
                        imgPath={logout}
                        imgWidth={36}
                        imgHeight={36}
                        labelColor={lightTheme.font_sub_color}
                        bgColor={lightTheme.bg_sub_color}
                        bdColor={lightTheme.bg_sub_color}
                        borderRadius={50}
                        onClick={()=>{}}
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
        backgroundColor: lightTheme.bg_main_color,
    },
    centreBorder: {
        width: "100%",
        borderLeftWidth: cw(30),
        borderRightWidth: cw(30),
        borderColor: lightTheme.bg_main_color,
        height: ch(10),
        backgroundColor: lightTheme.border_main_color
    },
    optionContainer: {
        width: "100%",
        paddingRight: cw(30),
        paddingLeft: cw(30),
        marginTop: ch(47),
        gap: ch(30)
    },
    confirmBtnContainer:{
        width: "100%",
        alignItems: "center",
        marginTop: calculateHeight(600),
    }
})

export default Mine