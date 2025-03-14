import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {useTranslation} from "react-i18next";
import {lightTheme} from "@/styles/global";

interface props {
    width: number
    height: number
    leftIcon: any
    leftIconWidth: number
    leftIconHeight: number
    topInfo: string
    bottomInfo: string
    infoSize: number
    infoWight: number
    infoColor: string
    rightIcon?: any
    rightIconWidth?: number
    rightIconHeight?: number
    rightInfo?: string
    rightInfoSize?: number
    rightInfoWight?: number
    rightInfoColor?: string
    clickFn?: any
}

const TokenLabel = ({
                          width,
                          height,
                          leftIcon,
                          leftIconWidth,
                          leftIconHeight,
                          topInfo,
                          bottomInfo,
                          infoSize,
                          infoWight,
                          infoColor,
                          rightIcon,
                          rightIconWidth,
                          rightIconHeight,
                          rightInfo,
                          rightInfoSize,
                          rightInfoWight,
                          rightInfoColor,
                          clickFn}: props) => {

    const {t} = useTranslation()

    const handlePress = ()=>{
        clickFn()
    }

    return (
        <>
            <TouchableOpacity style={[styles.container, {
                width: cw(width),
                height: ch(height),
            }]} onPress={handlePress}>

                <Image source={leftIcon} style={[{
                    width: cw(leftIconWidth),
                    height: ch(leftIconHeight),
                }]}/>


                <View style={styles.tokenInfoContainer}>
                    <Text style={[styles.labelText,
                        // @ts-ignore
                        {
                            fontSize: cw(infoSize),
                            color: infoColor,
                            fontWeight: infoWight,
                        }]}>{topInfo}</Text>

                    <Text style={[styles.labelText,
                        // @ts-ignore
                        {
                            fontSize: cw(infoSize),
                            color: infoColor,
                            fontWeight: infoWight,
                        }]}>{bottomInfo}</Text>
                </View>

                {
                    rightIcon != null && rightIcon != undefined ? (
                        <>
                            <Image source={rightIcon} style={[{
                                width: cw(rightIconWidth as number),
                                height: ch(rightIconHeight as number),
                            }]}/>
                        </>
                    ) : (
                        <>
                            <Text style={[
                                // @ts-ignore
                                {
                                    fontFamily: 'PingFang SC',
                                    fontSize: cw(rightInfoSize as number),
                                    color: rightInfoColor,
                                    fontWeight: rightInfoWight,
                                }]}>{rightInfo}</Text>
                        </>
                    )
                }
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    tokenInfoContainer: {
        alignItems: "center",
        marginRight: "auto",
        gap: ch(2)
    },
    labelText: {
        fontFamily: 'PingFang SC',
        marginRight: 'auto',
        marginLeft: cw(24),
    }
})

export default TokenLabel;