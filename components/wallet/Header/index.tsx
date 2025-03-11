import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import { calculateWidth as cw, calculateHeight as ch } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import MyButton from "@/components/Button";

const talk = require("@/assets/app/wallet/liaotian 1.png")
const Tron = require("@/assets/app/wallet/TRX.png")
const more = require("@/assets/app/wallet/downMore.png")

const WalletHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MyButton
                    width={250}
                    height={80}
                    label={"TRON"}
                    labelSize={30}
                    labelWight={600}
                    labelColor={lightTheme.font_main_color}
                    imgPath={Tron}
                    imgWidth={37}
                    imgHeight={37}
                    rightIcon={more}
                    iconHeight={20}
                    iconWidth={29}
                    bgColor={lightTheme.bg_main_color}
                    bdColor={lightTheme.border_main_color}
                    gapDistance={20}
                    borderRadius={20}
                    onClick={()=>{}}
                />
            </View>
            <TouchableOpacity style={styles.chatIconContainer}>
                <Image source={talk} style={styles.iconImage}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: ch(98),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: ch(20),
        paddingLeft: cw(30),
        paddingRight: cw(30),
    },
    titleContainer: {},
    title: {
        fontSize: cw(50),
        fontWeight: "600",
        lineHeight: ch(70),
        color: lightTheme.font_main_color,
        fontFamily: "PingFang SC",
    },
    chatIconContainer: {
    },
    iconImage: {
        width: cw(40),
        height: cw(40),
    }
});

export default WalletHeader;