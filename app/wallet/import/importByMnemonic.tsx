import "@/i18n";
import { calculateWidth, calculateHeight } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import {Platform, SafeAreaView, StyleSheet, Text, TextInput, Touchable, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import DefaultHeader from "@/components/Header/defaultHeader";
import {router} from "expo-router";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import MyButton from "@/components/Button";
import {getStringAsync} from "expo-clipboard";
import {validateMnemonicOrPrivateKey} from "@/utils/verifyMnemonic";


const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");
const pasteIcon = require("@/assets/app/create/niantie-2 1.png");


const ImportByMnemonic = ()=>{

    const {t} = useTranslation()
    const [inputInfo, setInputInfo] = useState("")
    const [pass, setPass] = useState(false)
    const [notice, setNotice] = useState("")

    const handleLeftClick = ()=>{
        router.back();
    }

    const handlePasteClick = async ()=>{
        try {
            const content = await getStringAsync()
            setInputInfo(content)
            verifyInput(content)
        }catch (err) {
            console.log("Paste failed:", err)
        }
    }

    const verifyInput = (message: string) => {
        let res = validateMnemonicOrPrivateKey(message)
        if (res?.isValid) {
            setPass(true)
            setNotice("")
        }else {
            setPass(false)
            setNotice(t('import:notice'))
        }
    }

    const handleConfirmClick = ()=>{
        verifyInput(inputInfo)
        // 进入下一步导入钱包步骤
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
                        {t('import:enter')}
                    </Text>

                    <TextInput
                        value={inputInfo}
                        placeholder={t('import:ifUse')}
                        placeholderTextColor={lightTheme.font_minor_color}
                        multiline={true}
                        onChangeText={(text)=>{setInputInfo(text)}}
                        style={styles.textInput}
                    />

                    <Text style={styles.notice}>{notice}</Text>
                </View>

                <View style={styles.btnContainer}>
                    <MyButton
                        width={162}
                        height={60}
                        label="import:paste"
                        labelSize={24}
                        labelWight={600}
                        labelColor={lightTheme.font_main_color}
                        imgPath={pasteIcon}
                        imgWidth={30}
                        imgHeight={30}
                        gapDistance={7}
                        bgColor={lightTheme.bg_main_color}
                        bdColor={lightTheme.border_main_color}
                        borderRadius={15}
                        onClick={handlePasteClick}
                    />
                </View>


                <View style={styles.confirmContainer}>
                    <MyButton
                        width={630}
                        height={100}
                        label="import:confirm"
                        labelSize={35}
                        labelWight={700}
                        labelColor={lightTheme.font_sub_color}
                        bgColor={lightTheme.bg_sub_color}
                        bdColor={lightTheme.bg_sub_color}
                        borderRadius={50}
                        onClick={handleConfirmClick}
                        disable={inputInfo == ""}
                    />
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
        height: calculateHeight(390),
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
    textInput: {
        width: calculateWidth(651),
        height: calculateHeight(180),
        outline: "none",
        color: lightTheme.font_main_color,
    },
    btnContainer: {
        width: "100%",
        alignItems: "flex-end",
        paddingRight: calculateWidth(30),
    },
    confirmContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: calculateHeight(593),
    },
    notice: {
        fontFamily: 'PingFang SC',
        color: "red",
        fontSize: calculateWidth(25),
        fontWeight: 600,
    }
})

export default ImportByMnemonic



