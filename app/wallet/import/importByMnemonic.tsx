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
import {getPrivateKeyIndexBound, savePhrase, savePrivateKey, savePrivateKeyIndexBound} from "@/utils/useStorageState";
import useAccountStore from "@/store/accountStore";
import ethService from "@/services/EthereumService"
import {HDNodeWallet, Mnemonic, Wallet} from "ethers";
import tronService from "@/services/TronService";
import Tronweb from "tronweb/src/tronweb";


const android = Platform.OS === "android";
const leftIcon = require("@/assets/app/create/back.png");
const pasteIcon = require("@/assets/app/create/niantie-2 1.png");


const ImportByMnemonic = ()=>{

    const {t} = useTranslation()
    const [inputInfo, setInputInfo] = useState("")
    const [pass, setPass] = useState(false)
    const [notice, setNotice] = useState("")
    const accountStore = useAccountStore()

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
            return res
        }else {
            setPass(false)
            setNotice(t('import:notice'))
            return res
        }
    }

    const handleConfirmClick = async ()=>{
        let res = verifyInput(inputInfo)
        // 进入下一步导入钱包步骤
        if (res?.isValid){
            // 合法验证完成
            if (res?.type == "privateKey"){
                 await handlePrivateKey()
            }else if (res?.type == "mnemonic"){
                await handleMnemonic()
            }
        }
    }

    // 处理私钥导入
    const handlePrivateKey =  async () => {
        try {
            let privateKeyIndex = await getPrivateKeyIndexBound()
            if (privateKeyIndex != null &&  privateKeyIndex != undefined){
                if (typeof privateKeyIndex != "number"){
                    privateKeyIndex = parseInt(privateKeyIndex)
                }

                // Ethereum适配
                // let address = ethService.getWalletByPublicKey(inputInfo)

                // Tron适配
                let address = tronService.getWalletPublicKey(inputInfo)
                accountStore.setAccountName("account: " + privateKeyIndex)
                accountStore.setAccountAddress(address.base58 as string)
                accountStore.setAccountPrivateKey(inputInfo)


                await savePrivateKey(inputInfo, privateKeyIndex)
                await savePrivateKeyIndexBound(privateKeyIndex)
            }
            // 跳转页面
            router.push("/(tabs)")
        }catch (error) {
            console.error("import err:", error)
        }

    }

    // 处理助记词导入
    const handleMnemonic = async () => {
        try {
            let privateKeyIndex = await getPrivateKeyIndexBound()
            if (typeof privateKeyIndex != 'number' && privateKeyIndex != undefined){
                // @ts-ignore
                privateKeyIndex = parseInt(privateKeyIndex)
            }
            // Ethereum适配
            // const unusedEthIndex = await ethService.findNextUnusedWalletIndex(inputInfo)
            // const importedEthWallets = await ethService.importAllActiveAddresses(inputInfo, unusedEthIndex);
            // let address = importedEthWallets[0].address
            // let mnemonic = Mnemonic.fromPhrase(inputInfo)
            // let hdNodeWallet = HDNodeWallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0")
            // let privateKey = hdNodeWallet.privateKey

            // Tron适配
            const unusedTronIndex = await tronService.findUnusedAddressIndex(inputInfo)
            const importedWallets = await tronService.importAllActiveAddresses(inputInfo, unusedTronIndex);
            let address = importedWallets[0].address
            let privateKey = importedWallets[0].privateKey

            accountStore.setAccountName("account: " + privateKeyIndex)
            accountStore.setAccountAddress(address)
            accountStore.setAccountPrivateKey(privateKey)
            accountStore.setOtherAccounts(importedWallets)

            await savePhrase(inputInfo)

            router.push("/(tabs)")
            console.log("import Addr:", address)
        }catch (error) {
            console.error("import err:", error)
        }
    }


    return (
        <>
            <SafeAreaView style={styles.container}>

                {/*Header*/}
                <DefaultHeader
                    leftIcon={leftIcon}
                    leftIconWidth={25}
                    leftIconHeight={42}
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
        paddingTop: android ? hp(3) : 0,
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



