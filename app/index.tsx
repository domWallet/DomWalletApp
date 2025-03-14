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
import {Debounce} from "@/utils/Functionutils";
import {getAuthCodeApi, loginApi} from "@/axios/http/registerAPI";
import {
    getPhrase,
    getPrivateKey,
    getPrivateKeyIndexBound,
    saveAccessToken,
    savePrivateKey, savePrivateKeyIndexBound
} from "@/utils/useStorageState";
import tronService from "@/services/TronService";
import useAccountStore from "@/store/accountStore";



const android = Platform.OS === "android";
const topImg = require("@/assets/app/create/bg1.png");

export default function Index() {
    const { t } = useTranslation()

    const [email, setEmail] = useState(false)
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState("")
    const [eMailInfo, setEMailInfo] = useState("")
    const [authInfo, setAuthInfo] = useState("")
    const [eMailWaring, setEMailWaring] = useState(false)
    const [authWaring, setAuthWaring] = useState(false)
    const [timeKeePing, setTimeKeePing] = useState(60)
    const [getAuth, setGetAuth] = useState(false)
    const accountStore = useAccountStore()

    useEffect(() => {
        setMessage(t('home:getAuth'))
    }, []);

    useEffect(()=>{
        (async () => {
            let index = await getPrivateKeyIndexBound()
            let privateKey
            let phrase
            if (index == 0 || index == undefined){
                privateKey = await getPrivateKey(0)
            }else {
                privateKey = await getPrivateKey(index - 1)
            }
            phrase = await getPhrase()
            if (privateKey != null && phrase == null){
                let address = tronService.getWalletPublicKey(privateKey)
                accountStore.setAccountName("account: " + index)
                accountStore.setAccountAddress(address.hex as string)
                accountStore.setAccountPrivateKey(privateKey)

                router.push("/(tabs)")
            }else if (privateKey == null && phrase != null){
                const wallet = await tronService.restoreWalletFromPhrase(phrase)
                let address = wallet.address
                let privateKey = wallet.privateKey
                accountStore.setAccountName("account: " + index)
                accountStore.setAccountAddress(address)
                accountStore.setAccountPrivateKey(privateKey)

                router.push("/(tabs)")
            }else if (privateKey != null && phrase != null){
                const wallet = await tronService.restoreWalletFromPhrase(phrase)
                let address = wallet.address
                let privateKey = wallet.privateKey
                accountStore.setAccountName("account: " + index)
                accountStore.setAccountAddress(address)
                accountStore.setAccountPrivateKey(privateKey)

                router.push("/(tabs)")
            }
        })()
    }, [])


    const gotoTest = ()=>{
        // @ts-ignore
        router.push("")
    }

    useEffect(() => {

        let intervalId: any

        if (getAuth && timeKeePing > 0) {
            intervalId = setInterval(()=>{
                let temp = timeKeePing - 1
                setTimeKeePing(temp)
            }, 1000)
            setMessage(timeKeePing + "s" + " " + t('home:retry'))
        }

        if (timeKeePing === 0){
            setGetAuth(false)
            setTimeKeePing(60)
            setMessage(t('home:getAuth'))
        }

        return () => {
            // @ts-ignore
            clearInterval(intervalId);
        }

    }, [timeKeePing, getAuth]);

    const verifyEmail = (text: any)=>{
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (eMailInfo == ""){
            setEMailWaring(true)
        }else {
            if (regex.test(text)){
                // 通过正则表达式验证
                setEMailWaring(false)
            }else {
                setEMailWaring(true)
            }
        }
    }

    const verifyAuth = (text: any)=>{
        let regex = /^\d{6}$/
        if (authInfo == ""){
            setAuthWaring(true)
        }else {
            if (regex.test(text)){
                setAuthWaring(false)
            }else {
                setAuthWaring(true)
            }
        }
    }

    const handleChangeEMaile = (text: any) => {
        let dou_verify = Debounce(verifyEmail, 1000)
        dou_verify(text)
        setEMailInfo(text)
    }

    const getAuthCode = async () =>{

        if (!eMailWaring){
            // 获取验证码
            setGetAuth(true)
            await getAuthCodeApi(eMailInfo)
        }
    }

    const handleChangeAuth = (text: any) => {
        let dou_verify = Debounce(verifyAuth, 1000)
        dou_verify(text)
        setAuthInfo(text)
    }


    const loginByCode = async () => {
        debugger
        if (authInfo != "" && !eMailWaring){
            let res = await loginApi(eMailInfo, authInfo)
            await saveAccessToken(res)
            // @ts-ignore
            router.push("choose")
        }
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
                    <Text style={[styles.warningText, {
                        opacity: eMailWaring ?  1 : 0,
                    }]} >{t('transfer:warn')}</Text>
                    <TextInput
                        style={[styles.textInput, {
                            marginBottom: ch(21),
                            borderColor: eMailWaring? lightTheme.font_warn_color : (email ? lightTheme.font_main_color : lightTheme.border_main_color),
                        }]}
                        placeholder={t('home:mail')}
                        value={eMailInfo}
                        onChangeText={(text) => handleChangeEMaile(text)}
                        onFocus={()=>{
                            setEmail(true)
                        }}
                        onBlur={()=>{
                            setEmail(false)
                        }}
                    />

                    <Text style={[styles.warningText, {
                        opacity: authWaring ?  1 : 0,
                    }]} >{t('transfer:warn')}</Text>
                    <TextInput
                        style={[styles.textInput, {
                            paddingRight: cw(220),
                            borderColor: authWaring? lightTheme.font_warn_color : (auth ? lightTheme.font_main_color : lightTheme.border_main_color),
                        }]}
                        keyboardType={"numeric"}
                        placeholder={t('home:auth')}
                        onChangeText={(text) => handleChangeAuth(text)}
                        onFocus={()=>{
                            setAuth(true)
                        }}
                        onBlur={()=>{
                            setAuth(false)
                        }}
                    />

                    <TouchableOpacity
                        style={[styles.submitBtnContainer, {
                            backgroundColor: getAuth ? lightTheme.border_main_color : lightTheme.font_main_color,
                        }]}
                        activeOpacity={(eMailWaring || getAuth) ? 1 : 0.5}
                        onPress={getAuthCode}
                    >
                        <Text style={[styles.submitBtnText, {
                            color: getAuth ? lightTheme.font_minor_color : lightTheme.bg_main_color,
                        }]}>{message}</Text>
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
                        onClick={loginByCode}
                        disable={authInfo === "" || authWaring}
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
        // gap: calculateHeight(41),
        marginTop: ch(64),
        position: "relative"
    },
    warningText:{
        marginRight: 'auto',
        marginBottom: ch(10),
        color: lightTheme.font_warn_color,
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

