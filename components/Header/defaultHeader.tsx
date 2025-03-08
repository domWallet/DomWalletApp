import "@/i18n";
import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {calculateWidth, calculateHeight} from "@/utils/calculatedPercentage";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {useTranslation} from "react-i18next";
import {lightTheme} from "@/styles/global";

interface props {
    leftIcon: ImageSourcePropType;
    leftIconWidth: number;
    leftIconHeight: number;
    clickLeft: any;
    info?: string,
    infoSize?: number;
    infoWight?: number;
    infoColor?: string;
    rightIcon?: ImageSourcePropType;
    rightIconWidth?: number;
    rightIconHeight?: number;
    clickRight?:any;
    showBottom?:boolean;
}

const DefaultHeader = ({leftIcon, leftIconWidth, leftIconHeight, clickLeft, info, infoSize, infoWight, infoColor, rightIcon, rightIconWidth, rightIconHeight, clickRight, showBottom}: props)=>{

    const { t } = useTranslation();
    let trueLeftIconWidth = calculateWidth(leftIconWidth);
    let trueLeftIconHeight = calculateHeight(leftIconHeight);
    let trueInfoSize = 0;
    let trueRightIconWidth = 0;
    let trueRightIconHeight = 0;
    if (info != null && info != undefined && infoSize != null && infoSize != undefined){
        trueInfoSize = calculateWidth(infoSize)
    }
    if (rightIcon != null && rightIcon != undefined){
        if (rightIconWidth != null && rightIconWidth != undefined && rightIconHeight != null && rightIconHeight != undefined){
            trueRightIconWidth = calculateWidth(rightIconWidth)
            trueRightIconHeight = calculateHeight(rightIconHeight)
        }
    }



    return (
        <>
            <View style={[styles.container, {
                borderBottomWidth: showBottom ? 2 : 0,
                borderColor: showBottom ? lightTheme.border_main_color : "",
            }]}>

                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={clickLeft}
                >
                    <Image source={leftIcon} style={{
                        width: trueLeftIconWidth,
                        height: trueLeftIconHeight,
                    }}/>
                </TouchableOpacity>

                <Text
                    // @ts-ignore
                    style={{
                        fontSize: cw(infoSize as number),
                        fontWeight: (infoWight as number),
                        color: infoColor,
                        position: "absolute",
                        left: "50%",
                        transform: [{translateX: "-15%"}],
                    }}>{t(info as string)}</Text>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: calculateHeight(98),
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: calculateWidth(30),
        paddingRight: calculateWidth(30),
        backgroundColor: "",
        justifyContent: "space-between"
    },
    btnContainer: {
        alignItems: "center",
        justifyContent: "center",
    }
})

export default DefaultHeader;


