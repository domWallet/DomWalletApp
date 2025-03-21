import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {lightTheme} from "@/styles/global";
import {useTranslation} from "react-i18next";
import SkeletonItem from "@/components/Skeleton/SkeletonItem";
import uuid from "react-native-uuid";

interface props {
    tokenList: any[]
}

interface token {
    symbol: string,
    price: string,
    sign: string,
    change: string,
}

const CurrencyPage = ({tokenList}: props) => {

    const {t} = useTranslation();

    const Skeleton = () => {
        return (
            <>
                <View style={styles.skeletonContainer}>
                    <View style={styles.skeletonItem}>
                        <SkeletonItem
                            width={154}
                            height={40}
                            borderRadius={10}
                        />

                        <SkeletonItem
                            width={154}
                            height={40}
                            borderRadius={10}
                        />

                        <SkeletonItem
                            width={122}
                            height={40}
                            borderRadius={10}
                        />
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
                    renderItem={Skeleton}
                    keyExtractor={(item) => uuid.v4().toString()}
                    contentContainerStyle={{
                        width: "100%",
                        alignItems: "center",
                    }}
                />
            </>
        )
    }

    const  TokenInfo = ({symbol, price, sign, change}: token) => {
        return (
            <>
                <View style={styles.tokenItem}>

                    <View style={styles.tokenSymbol}>
                        <Text style={styles.symbolText}>{symbol}</Text>
                        <Text style={styles.symbolUSDT}>{"/USDT"}</Text>
                    </View>

                    <Text style={styles.priceText}>{price}</Text>

                    <View style={[styles.changeContainer, {
                        backgroundColor: sign === "0" ?
                            lightTheme.bg_minor_color :
                            (sign === "1" ? lightTheme.btn_success_color : lightTheme.btn_error_color)
                    }]}>
                        <Text style={[styles.changeText, {
                            color: sign === "0" ?
                                lightTheme.font_minor_color :
                                (sign === "1" ? lightTheme.font_up_color : lightTheme.font_down_color)
                        }]}>{change}</Text>
                    </View>
                </View>
            </>
        )
    }


    const TokenHolder = ()=>{

        return (
            <>
                <FlatList
                    data={tokenList}
                    renderItem={(items) => (<TokenInfo symbol={items.item.symbol} price={items.item.price} sign={items.item.sign} change={items.item.change} />)}
                    keyExtractor={(item) => uuid.v4().toString()}
                />
            </>
        )
    }



    return (
        <>
            <SafeAreaView style={styles.container}>

                <View style={styles.topHeader}>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerText1}>{t('market:currency')}</Text>

                        <Text style={styles.headerText1}>{t('market:latest')}</Text>

                        <Text style={styles.headerText1}>{t('market:today')}</Text>
                    </View>
                </View>

                <View style={styles.listContainer}>
                    {
                        tokenList.length === 0 ? <SkeletonHolder /> : <TokenHolder />
                    }
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height:"100%",
        backgroundColor: lightTheme.bg_main_color,
        alignItems:"center"
    },
    topHeader:{
        width: "100%",
        paddingRight: cw(30),
        paddingLeft: cw(30),
    },
    headerInfo:{
        width: cw(690),
        height: ch(67),
        backgroundColor: lightTheme.bg_gray_color,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    headerText1:{
        fontFamily: 'PingFang SC',
        fontSize: cw(20),
        fontWeight: 600,
        width: cw(144),
        color: lightTheme.font_minor_color
    },
    skeletonContainer: {
        width: "100%",
        height: ch(80),

    },
    skeletonItem: {
        width: cw(690),
        height: ch(80),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderBottomWidth: 2,
        borderBottomColor: lightTheme.border_main_color,
        borderStyle: "solid",
    },
    listContainer:{
        width: "100%",
        height: "100%",
        marginTop: ch(6),
    },
    tokenItem: {
        width: cw(690),
        height: ch(80),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderBottomWidth: 2,
        borderBottomColor: lightTheme.border_main_color,
        borderStyle: "solid",
    },
    tokenSymbol:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: cw(144),
        height: ch(40),
    },
    symbolText:{
        fontFamily: 'PingFang SC',
        fontSize: cw(28),
        fontWeight: 600,
        color: lightTheme.font_main_color
    },
    symbolUSDT:{
        fontFamily: 'PingFang SC',
        fontSize: cw(24),
        fontWeight: 600,
        color: lightTheme.font_minor_color
    },
    priceText:{
        width: cw(164),
        height: "100%",
        fontFamily: 'PingFang SC',
        fontSize: cw(28),
        fontWeight: 400,
        color: lightTheme.font_main_color,
        lineHeight: ch(80),
    },
    changeContainer: {
        width: cw(122),
        height: ch(40),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: lightTheme.bg_minor_color,
    },
    changeText:{
        fontFamily: 'PingFang SC',
        fontSize: cw(28),
        fontWeight: 600,
        color: lightTheme.font_minor_color,
    }
})

export default CurrencyPage
