import "@/i18n";
import { calculateWidth, calculateHeight } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTranslation} from "react-i18next";
import {RadioButton} from "react-native-paper";
import {useState} from "react";

interface props {
    info: string
    clickFn: any
}

const Label = ({info, clickFn}: props)=>{

    const [sign, setSign] = useState(false)
    const [click, setClick] = useState("unchecked")
    const {t} = useTranslation()

    const handleClick = ()=>{
        setSign(!sign)
        if(sign){
            setClick("unchecked")
        }else {
            setClick("checked")
        }
        clickFn()
    }

    return (
        <>
            <TouchableOpacity style={[styles.container, {
                borderColor: click === "checked" ? lightTheme.font_main_color : lightTheme.border_main_color
            }]} onPress={handleClick}>

                <Text style={styles.infoText}>{t(info)}</Text>

                <RadioButton
                    onPress={handleClick}
                    // @ts-ignore
                    status={click}
                    color={"#000000"}
                />

            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: calculateWidth(690),
        height: calculateHeight(128),
        backgroundColor: lightTheme.bg_main_color,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: "center",
        paddingLeft: calculateWidth(30),
        paddingRight: calculateWidth(30),
        justifyContent: "space-between",
        borderWidth: 2,
        borderColor: lightTheme.border_main_color,
    },
    infoText: {
        width: calculateWidth(527),
        fontFamily: "PingFang SC",
        fontWeight: 400,
        fontSize: calculateWidth(24),
        lineHeight: calculateHeight(34),
        color: lightTheme.font_main_color,
    }
})

export default Label;

