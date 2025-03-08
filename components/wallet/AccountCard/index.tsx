import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { calculateWidth as cw, calculateHeight as ch } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";

interface props {
    imgPath: any,
    accountName: string,
    balance: string,
}

const WalletCard = ({imgPath, accountName, balance}: props) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.walletInfo}>
                    <View style={styles.walletIconName}>
                        <Image source={imgPath} style={styles.walletIcon} />
                        <View style={styles.walletName}>
                            <Text style={styles.walletNameText}>{accountName}</Text>
                        </View>
                    </View>
                    <View style={styles.balance}>
                        <Text style={styles.balanceText}>${balance}</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: lightTheme.font_main_color,
        borderRadius: 15,
        padding: ch(20),
        marginBottom: ch(20),
        width: "100%",
        height: ch(280),
    },
    walletInfo: {
        marginBottom: ch(35),
    },
    walletIconName: {
        flexDirection: "row",
        alignItems: "center",
        gap: cw(10),
        marginBottom: ch(10),
    },
    walletIcon: {
        width: cw(50),
        height: cw(50),
        borderRadius: 50,
    },
    walletName: {},
    walletNameText: {
        fontSize: cw(34),
        fontWeight: 600,
        lineHeight: ch(48),
        color: lightTheme.bg_main_color,
        fontFamily: "PingFang SC",
    },
    balance: {
        marginTop: ch(20),
    },
    balanceText: {
        fontSize: cw(90),
        fontWeight: 800,
        lineHeight: ch(98),
        color: lightTheme.bg_main_color,
        fontFamily: "Inter-SemiBold",
    },
});

export default WalletCard;
