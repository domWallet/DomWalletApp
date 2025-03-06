import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import "@/i18n";
import { calculateWidth as cw, calculateHeight as ch } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import {useEffect, useState} from "react";

interface props {
    mnemonic: string;
    pressFn: ()=>{};
}

const TouchMnemonic = ({mnemonic, pressFn}:props)=>{

    const [isPress, setIsPress] = useState("unPress")


    const handelPress = ()=>{
        if (isPress == "unPress"){
            setIsPress("Press")
        }else {
            setIsPress("unPress")
        }
        pressFn()
    }

    return (
        <>
            <TouchableOpacity style={[styles.container, {
                backgroundColor: isPress == "Press" ? lightTheme.border_main_color : lightTheme.bg_main_color
            }]} onPress={handelPress}>
                <Text style={[styles.mnemonicText, {
                    color: isPress == "Press" ? lightTheme.font_minor_color : lightTheme.font_main_color
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

