import {
    Image,
    ImageBase,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import "../i18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from  "react-native-responsive-screen";
import {useTranslation} from "react-i18next";
import {Platform} from "react-native";
import { calculateWidth, calculateHeight } from "@/utils/calculatedPercentage";
import { calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {useEffect, useState} from "react";
import {lightTheme} from "@/styles/global";
import MyButton from "@/components/Button";
import {Href, router} from "expo-router";
import Routes from "@/constant/routes";


const android = Platform.OS === "android";
const topImg = require("@/assets/app/create/bg1.png");

export default function Index() {
    const { t } = useTranslation()

    const [email, setEmail] = useState(false)
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        setMessage(t('home:getAuth'))
    }, []);

    const gotoTest = ()=>{
        // @ts-ignore
        router.push("test")
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

            <KeyboardAvoidingView style={styles.keyBoardContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.textInput, {
                            borderColor: email ? lightTheme.font_main_color : lightTheme.border_main_color,
                        }]}
                        placeholder={t('home:mail')}
                        onFocus={()=>{
                            setEmail(true)
                        }}
                        onBlur={()=>{
                            setEmail(false)
                        }}
                    />

                    <TextInput
                        style={[styles.textInput, {
                            paddingRight: cw(220),
                            borderColor: auth ? lightTheme.font_main_color : lightTheme.border_main_color,
                        }]}
                        placeholder={t('home:auth')}
                        onFocus={()=>{
                            setAuth(true)
                        }}
                        onBlur={()=>{
                            setAuth(false)
                        }}
                    />

                    <TouchableOpacity style={styles.submitBtnContainer}>
                        <Text style={styles.submitBtnText}>{message}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomBtnContainer}>
                    <MyButton
                        width={630}
                        height={100}
                        label="home:register"
                        labelSize={35}
                        labelWight={700}
                        labelColor={lightTheme.font_sub_color}
                        bgColor={lightTheme.bg_sub_color}
                        bdColor={lightTheme.bg_sub_color}
                        borderRadius={50}
                        onClick={gotoCreate}
                    />
                </View>
            </KeyboardAvoidingView>




        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: android ? hp(3) : 0,
        width: "100%",
        height: 999,
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
        marginTop: calculateHeight(66),
        gap: calculateHeight(40),
    },

    inputContainer:{
        width: "100%",
        alignItems: "center",
        backgroundColor: lightTheme.bg_main_color,
        gap: calculateHeight(41),
        marginTop: ch(84),
        position: "relative"
    },
    textInput:{
        width: cw(629),
        height: ch(100),
        borderWidth: 2,
        borderColor: lightTheme.border_main_color,
        borderRadius: 12,
        fontFamily: 'PingFang SC',
        fontSize: cw(30),
        fontWeight: 400,
        color: lightTheme.font_main_color,
        paddingLeft: cw(30),
        paddingRight: cw(30),
    },
    keyBoardContainer:{
        flex:1,
        position: "absolute",
        bottom: ch(187),
    },
    submitBtnContainer:{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: cw(184),
        height: ch(67),
        backgroundColor: lightTheme.font_main_color,
        borderRadius: 12,
        bottom: 10,
        right: 10,
    },
    submitBtnText:{
        fontSize: cw(20),
        fontWeight: 600,
        fontFamily: 'PingFang SC',
        color: lightTheme.bg_main_color
    }
})
