import {Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import PersonalCard from "@/components/Mine/personalCard";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";


const android = Platform.OS === "android";
const photo = require("@/assets/app/wallet/photo.png")
const more = require("@/assets/app/mine/more.png")
const kyc = require("@/assets/app/mine/")

const Mine = () => {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <PersonalCard photoPath={photo} userName={"Anthony Perez"} UID={"2816492"}/>

                <View style={styles.centreBorder}></View>

                <View style={styles.optionContainer}>


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
    }
})

export default Mine