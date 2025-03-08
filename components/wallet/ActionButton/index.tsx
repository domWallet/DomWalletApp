import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import { calculateWidth as cw, calculateHeight as ch } from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";


interface props {
    imgPath: any,
    actionName: string,
    action: any,
}

const ActionButton = ({imgPath, actionName, action}: props)=>{

    const handlePress = ()=>{
        action()
    }

    return (
        <>
            <TouchableOpacity style={styles.actionButton} onPress={handlePress}>
                <View style={styles.iconContainer}>
                    <Image source={imgPath}  style={styles.iconImage}/>
                </View>
                <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonText}>{actionName}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        flexDirection: "column",
        alignItems: "center",
        height: ch(104),
        gap: ch(20),
    },
    iconContainer: {
    },
    iconImage: {
        width: cw(50),
        height: cw(50),
    },
    buttonTextContainer: {},
    buttonText: {
        fontSize: cw(24),
        fontWeight: 600,
        lineHeight: ch(34),
        color: lightTheme.font_main_color,
        fontFamily: "PingFang SC",
    },
})

export default ActionButton



