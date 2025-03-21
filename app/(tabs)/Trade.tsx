import {Image, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import DefaultHeader from "@/components/Header/defaultHeader";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import TradeCard from "@/components/Trade/card/tradeCard";
import MyButton from "@/components/Button";

const android = Platform.OS === "android";
const transfer = require("@/assets/app/transaction/trade.png")

const Trade = () => {
    return (
        <>
            <SafeAreaView style={styles.container}>

                {/*Header*/}
                <DefaultHeader
                    info={"transfer:exchange"}
                    infoWight={600}
                    infoSize={30}
                    infoColor={lightTheme.font_main_color}
                />

                <View style={styles.cardContainer}>
                    <TradeCard />
                </View>

                <View style={styles.transferImgContainer}>
                    <Image source={transfer} style={{
                        width: cw(40),
                        height: cw(40)
                    }}/>
                </View>

                <View style={styles.cardContainer2}>
                    <TradeCard />
                </View>


                <View style={styles.bottomBtnContainer}>
                    <MyButton
                        width={630}
                        height={100}
                        label="transfer:trade"
                        labelSize={35}
                        labelWight={700}
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
    cardContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: ch(40)
    },
    transferImgContainer:{
        width: "100%",
        alignItems: "center",
        marginTop: ch(20),
        marginBottom: ch(20)
    },
    cardContainer2: {
        width: "100%",
        alignItems: "center",
    },
    bottomBtnContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: ch(400)
    }
})


export default Trade