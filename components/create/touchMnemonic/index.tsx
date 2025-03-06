import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import "@/i18n";
import { calculateWidth as cw, calculateHeight as ch } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import {useEffect, useState} from "react";

interface props {
    sign: boolean;
    mnemonic: string;
    pressFn: any;
}

const TouchMnemonic = ({sign, mnemonic, pressFn}:props)=>{

    const handelPress = ()=>{
        pressFn(mnemonic);
    }

    return (
        <>
            <TouchableOpacity style={[styles.container, {
                backgroundColor: sign ? lightTheme.border_main_color : lightTheme.bg_main_color
            }]} onPress={handelPress} activeOpacity={sign ? 1 : 0.5 }
            >
                <Text style={[styles.mnemonicText, {
                    color: sign ? lightTheme.font_minor_color : lightTheme.font_main_color
                }]}>{mnemonic}</Text>
            </TouchableOpacity>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        width: cw(160),
        height: ch(58),
        backgroundColor: lightTheme.bg_main_color,
        borderWidth: 1,
        borderColor: lightTheme.border_main_color,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 5,
    },
    mnemonicText: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: cw(24),
        lineHeight: ch(34),
        color: lightTheme.font_main_color,
    }
})


export default TouchMnemonic;

