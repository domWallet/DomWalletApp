import {FlatList, Platform, SafeAreaView, StyleSheet, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import SkeletonItem from "@/components/Skeleton/SkeletonItem";
import uuid from "react-native-uuid";
import {useEffect, } from "react";
import {getPhrase, getPrivateKey, getPrivateKeyIndexBound} from "@/utils/useStorageState";
import tronService from "@/services/TronService";
import useAccountStore from "@/store/accountStore";
import { useRouter} from "expo-router";
import {Buffer} from "buffer";

global.Buffer = Buffer;


const android = Platform.OS === "android";

const Index = () => {

    const accountStore = useAccountStore()

    const tokenInfoSkeleton = ()=>{
        return (
            <>
                <View style={styles.tokenInfoSkeletonContainer}>

                    <SkeletonItem width={70} height={70} borderRadius={20}/>

                    <View style={styles.infoContainer}>
                        <SkeletonItem width={150} height={39} borderRadius={12}/>

                        <SkeletonItem width={150} height={39} borderRadius={12}/>
                    </View>

                    <View style={styles.rightContainer}>
                        <SkeletonItem width={150} height={39} borderRadius={12}/>

                        <SkeletonItem width={150} height={39} borderRadius={12}/>
                    </View>

                </View>
            </>
        )
    }

    const SkeletonHolder = ()=>{

        return (
            <>
                <FlatList
                    data={[1,2,3,4]}
                    renderItem={tokenInfoSkeleton}
                    keyExtractor={(item) => uuid.v4().toString()}
                />
            </>
        )
    }

    const router = useRouter()

    useEffect(() => {
        (async () => {
            debugger
            // 加载私钥操作
            let index = await getPrivateKeyIndexBound()
            let privateKey
            let phrase
            if (index == 0 || index == undefined){
                privateKey = await getPrivateKey(0)
            }else {
                privateKey = await getPrivateKey(index - 1)
            }
            phrase = await getPhrase()

            if ((privateKey == "" && phrase == "") || (privateKey == null && phrase == null) || (privateKey == undefined && phrase == undefined)){
                // @ts-ignore
                router.push("login")
            }else {
                if (privateKey != null && phrase == null){
                    let address = tronService.getWalletPublicKey(privateKey)
                    accountStore.setAccountName("account: " + index)
                    accountStore.setAccountAddress(address.base58 as string)
                    accountStore.setAccountPrivateKey(privateKey)
                    // @ts-ignore
                    router.push("(tabs)")
                }else if (privateKey == null && phrase != null){
                    let tronweb = tronService.tronWeb
                    const wallet = tronweb.fromMnemonic(phrase, "m/44'/195'/0'/0/1")
                    let address = wallet.address
                    let privateKey = wallet.privateKey
                    accountStore.setAccountName("account: " + index)
                    accountStore.setAccountAddress(address)
                    accountStore.setAccountPrivateKey(privateKey)
                    // @ts-ignore
                    router.push("(tabs)")
                }else if (privateKey != null && phrase != null){
                    let tronweb = tronService.tronWeb
                    const wallet = tronweb.fromMnemonic(phrase, "m/44'/195'/0'/0/1")
                    let address = wallet.address
                    let privateKey = wallet.privateKey
                    accountStore.setAccountName("account: " + index)
                    accountStore.setAccountAddress(address)
                    accountStore.setAccountPrivateKey(privateKey)
                    // @ts-ignore
                    router.push("(tabs)")
                }
            }
        })()
    }, []);

    return (
        <>
            <SafeAreaView style={styles.container}>

                <View style={styles.headerView}>
                    <SkeletonItem width={250} height={80} borderRadius={20}/>

                    <SkeletonItem width={180} height={80} borderRadius={20}/>
                </View>

                <View style={styles.cardView}>
                    <SkeletonItem width={690} height={280} borderRadius={20}/>
                </View>

                <View style={styles.actionContainer}>
                    <SkeletonItem width={93} height={104} borderRadius={20}/>

                    <SkeletonItem width={93} height={104} borderRadius={20}/>

                    <SkeletonItem width={93} height={104} borderRadius={20}/>

                    <SkeletonItem width={93} height={104} borderRadius={20}/>
                </View>

                <View style={styles.tabContainer}>
                    <SkeletonItem width={93} height={50} borderRadius={20} />

                    <SkeletonItem width={93} height={50} borderRadius={20} />

                    <SkeletonItem width={93} height={50} borderRadius={20} />

                    <SkeletonItem width={93} height={50} borderRadius={20} />
                </View>

                <View style={styles.tokenInfoSkeleton}>
                    <SkeletonHolder />
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
    headerView: {
        width: "100%",
        height: ch(100),
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: cw(30),
        paddingRight: cw(30),
        marginTop: ch(200),
    },
    cardView: {
        marginTop: ch(30),
        width: "100%",
        paddingLeft: cw(30),
        paddingRight: cw(30),
        alignItems: "center"
    },
    actionContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: cw(30),
        paddingRight: cw(30),
        marginTop: ch(62),
    },
    tokenInfoSkeletonContainer:{
        width: "100%",
        height: ch(70),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: ch(60),
    },
    infoContainer: {
        justifyContent: "space-between",
        height: "100%",
        gap: ch(7),
        marginLeft: cw(24),
    },
    rightContainer: {
        marginLeft: "auto",
        height: "100%",
        justifyContent: "space-between",
        gap: ch(7),
        alignItems: "flex-end"
    },
    tokenInfoSkeleton: {
        width: "100%",
        paddingLeft: cw(30),
        paddingRight: cw(30),
        marginTop: ch(50),
    },
    tabContainer: {
        width: "100%",
        paddingLeft: cw(30),
        paddingRight: cw(30),
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: ch(50),
    }
})

export default Index



