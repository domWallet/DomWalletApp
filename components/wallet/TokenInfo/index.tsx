import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import {View, StyleSheet, Image, Text} from "react-native";
import {useEffect, useState} from "react";

interface props {
    icon: any,
    name: string,
    price: string, // 现价
    change: string,
    sign: number,
    amount: string, // 持有数量
    worth: string,
}


const TokenInfo = ({icon, name, price, change, sign, amount, worth}: props)=>{

    const [changeColor, setChangeColor] = useState("")

    useEffect(()=>{
        if (sign == 1){
            setChangeColor(lightTheme.font_up_color)
        }else if (sign == 2){
            setChangeColor(lightTheme.font_warn_color)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Image source={icon}  style={styles.iconImage} />

            <View style={styles.infoContainer}>
                <Text style={styles.infoText1}>{name}</Text>

                <View style={styles.infoBottom}>
                    <Text style={styles.bottomText1}>${price}</Text>
                    <Text style={[styles.bottomText2, {
                        color: changeColor
                    }]}>{change}</Text>
                </View>
            </View>

            <View style={styles.rightContainer}>
                <Text style={styles.rightText1}>{amount}</Text>
                <Text style={styles.rightText2}>${worth}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: ch(70),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: ch(60),
    },
    iconImage: {
        width: cw(70),
        height: cw(70),
    },
    infoContainer: {
        justifyContent: "space-between",
        gap: ch(7),
        marginLeft: cw(24),
    },
    infoText1:{
        fontFamily: "PingFang SC",
        fontWeight: 600,
        fontSize: cw(24),
        lineHeight: ch(39),
        color: lightTheme.font_main_color,
    },
    infoBottom:{
        flexDirection: "row",
        alignItems: "center",
        gap: cw(10),

    },
    bottomText1:{
        fontFamily: "PingFang SC",
        fontWeight: 400,
        fontSize: cw(24),
        color: lightTheme.font_minor_color,
    },
    bottomText2:{
        fontFamily: "PingFang SC",
        fontWeight: 400,
        fontSize: cw(24),
        color: lightTheme.font_main_color,
    },
    rightContainer:{
        marginLeft: "auto",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    rightText1:{
        fontFamily: "PingFang SC",
        fontWeight: 800,
        fontSize: cw(24),
        color: lightTheme.font_main_color,
    },
    rightText2:{
        fontFamily: "PingFang SC",
        fontWeight: 400,
        fontSize: cw(24),
        color: lightTheme.font_minor_color,
    }
})

export default TokenInfo


