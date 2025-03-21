import {Image, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {lightTheme} from "@/styles/global";
import {useState} from "react";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {useTranslation} from "react-i18next";

interface props {
    placeInfo: string,
    inputFn: any
}

const search = require("@/assets/app/transaction/sousuo.png")

const DefaultSearch = ({placeInfo, inputFn}: props) => {

    const [inputValue, setInputValue] = useState("")

    const {t} = useTranslation()

    return (
        <View style={styles.container}>
            <TextInput
                value={inputValue}
                onChangeText={(text)=>{setInputValue(text)}}
                placeholder={t(placeInfo)}
                placeholderTextColor={lightTheme.font_minor_color}
                style={styles.textInput}
            />
            <TouchableOpacity style={styles.searchBtn}>
                <Image source={search} style={styles.searchIcon}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        backgroundColor: lightTheme.bg_main_color,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    textInput:{
        width: cw(690),
        height: ch(67),
        alignItems: "center",
        verticalAlign: "middle",
        fontWeight: 600,
        fontSize: cw(24),
        fontFamily: 'PingFang SC',
        borderWidth: 2,
        borderColor: lightTheme.border_main_color,
        borderRadius: 5,
        paddingLeft: cw(10),
        paddingRight: cw(90),
    },
    searchBtn:{
        width: cw(80),
        height: "80%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: lightTheme.bg_main_color,
        right: cw(5),
    },
    searchIcon:{
        width: cw(32),
        height: cw(32),
    }
})

export default DefaultSearch






