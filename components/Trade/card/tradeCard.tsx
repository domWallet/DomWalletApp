import {StyleSheet, View, Text, Image} from "react-native";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import {useTranslation} from "react-i18next";
import PullDownButton from "@/components/Button/pullDownButton";

const wallet = require("@/assets/app/mine/Manage Wallet.png")
const downIcon = require("@/assets/app/transaction/Rectangle 22.png")
const network = require("@/assets/app/market/SOL.jpeg")
const token = require("@/assets/app/market/BTC.png")

const TradeCard = () => {

    const {t} = useTranslation()

    return (
        <>
            <View style={styles.container}>

                <View style={styles.cardHeader}>

                    <View style={styles.topContainer}>
                        <Text style={styles.headerText}>{t('transfer:wallet')}</Text>

                        <PullDownButton
                            width={160}
                            height={60}
                            clickFn={()=>{}}
                            leftIcon={wallet}
                            leftIconHeight={36}
                            leftIconWidth={36}
                            label={"Account 1"}
                            labelSize={cw(30)}
                            labelWight={800}
                            labelColor={lightTheme.font_main_color}
                            rightIcon={downIcon}
                            rightIconWidth={13.8}
                            rightIconHeight={8}
                            borderRadius={15}
                        />
                    </View>

                    <View style={styles.topContainer}>
                        <Text style={styles.headerText}>{t('transfer:network')}</Text>

                        <PullDownButton
                            width={160}
                            height={60}
                            clickFn={()=>{}}
                            leftIcon={network}
                            leftIconHeight={36}
                            leftIconWidth={36}
                            leftBorderRadius={"50%"}
                            label={"SOL"}
                            labelSize={cw(30)}
                            labelWight={800}
                            labelColor={lightTheme.font_main_color}
                            rightIcon={downIcon}
                            rightIconWidth={13.8}
                            rightIconHeight={8}
                            borderRadius={15}
                        />
                    </View>

                </View>

                <View style={styles.cardBottom}>

                    <View style={styles.tokenContainer}>

                        <Image source={token} style={{
                            width: cw(60),
                            height: cw(60)
                        }}/>

                        <Text style={styles.tokenText}>{"BTC"}</Text>

                        <Image source={downIcon} style={{
                            width: cw(13),
                            height: ch(8)
                        }}/>
                    </View>

                    <View>
                        <Text style={{
                            fontFamily: 'PingFang SC',
                            fontSize: cw(40),
                            fontWeight: 800,
                            color: lightTheme.font_main_color,
                        }}>{"0.0"}</Text>
                    </View>
                </View>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        width: cw(690),
        height: ch(255),
        paddingRight: cw(30),
        paddingLeft: cw(30),
        paddingTop: ch(27),
        paddingBottom: ch(41),
        backgroundColor: lightTheme.bg_main_color,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: lightTheme.border_main_color,
    },
    cardHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    topContainer:{
        flexDirection: "row",
        alignItems: "center",
        gap: cw(24)
    },
    headerText: {
        fontFamily: 'PingFang SC',
        fontSize: cw(24),
        fontWeight: 600,
        color: lightTheme.font_main_color
    },
    cardBottom:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: ch(67),
    },
    tokenContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: cw(24)
    },
    tokenText:{
        fontFamily: 'PingFang SC',
        fontSize: cw(28),
        fontWeight: 600,
        color: lightTheme.font_main_color
    }
})


export default TradeCard


