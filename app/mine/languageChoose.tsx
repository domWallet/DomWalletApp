import {Image, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import DefaultHeader from "@/components/Header/defaultHeader";
import {router} from "expo-router";
import { calculateWidth as cw, calculateHeight as ch } from "@/utils/calculatedPercentage";
import {useState} from "react";
import {Checkbox} from "expo-checkbox";

const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");
const englishIcon = require("@/assets/app/mine/english2x.png")
const chineseIcon = require("@/assets/app/mine/chinese2x.png")

const LanguageChoose = () => {

    const [checked, setChecked] = useState(false)
    const handleLeftClick = ()=>{
        router.back();
    }

    return (
        <>
            <SafeAreaView style={styles.container}>

                {/*Header*/}
                <DefaultHeader
                    leftIcon={leftIcon}
                    leftIconWidth={25}
                    leftIconHeight={42}
                    info={"header:language"}
                    infoWight={600}
                    infoSize={30}
                    infoColor={lightTheme.font_main_color}
                    clickLeft={handleLeftClick}
                />

                <View style={styles.optionContainer}>

                    <View style={[styles.optionItem, {
                        borderBottomWidth: ch(5),
                        borderColor: lightTheme.border_main_color,
                        borderStyle: "solid",
                    }]}>

                        <View style={styles.infoItem}>
                            <Image source={chineseIcon} style={styles.infoImage}/>

                            <Text style={styles.infoText}>{"繁體中文"}</Text>
                        </View>

                        <Checkbox
                            value={checked}
                            color={lightTheme.font_main_color}
                            onValueChange={setChecked}
                            style={styles.checkbox}
                        />
                    </View>

                    <View style={styles.optionItem}>

                        <View style={styles.infoItem}>
                            <Image source={englishIcon} style={styles.infoImage}/>

                            <Text style={styles.infoText}>{"English"}</Text>
                        </View>

                        <Checkbox
                            value={!checked}
                            color={lightTheme.font_main_color}
                            onValueChange={(value)=>{
                                setChecked(!value)
                            }}
                            style={styles.checkbox}
                        />
                    </View>

                </View>
            </SafeAreaView>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: android ? hp(3) : 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: lightTheme.bg_main_color,
    },
    optionContainer:{
        width: "100%",
        paddingLeft: cw(30),
        paddingRight: cw(30),

    },
    optionItem: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: ch(56),
        paddingBottom: ch(56),
    },
    infoItem:{
        flexDirection: "row",
        alignItems: "center",
        gap: cw(19)
    },
    infoImage:{
        width: cw(41),
        height: cw(41),
    },
    infoText:{
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: cw(28),
        color: lightTheme.font_main_color,
    },
    checkbox:{
        width: cw(32),
        height: cw(32),
        borderRadius: "50%",
    }
})

export default LanguageChoose;
