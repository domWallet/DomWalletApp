import "@/i18n";
import { calculateWidth, calculateHeight } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import {StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";

interface props {
    info: string
    clickFn: any
}

const Label = ({info, clickFn}: props)=>{

    const {t} = useTranslation()

    return (
        <>
            <View style={[styles.container]}>

                <Text style={styles.infoText}>{t('create:info')}</Text>


            </View>
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

