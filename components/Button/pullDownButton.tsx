import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {lightTheme} from "@/styles/global";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";


interface props{
    width: number
    height: number
    clickFn: any
    leftIcon: any
    leftIconWidth: number
    leftIconHeight: number
    leftBorderRadius?: number | string
    rightIcon: any
    rightIconWidth: number
    rightIconHeight: number
    label: string
    labelSize: number
    labelWight: number
    labelColor: string
    borderRadius: number
}

const PullDownButton = ({width, height, clickFn, leftIcon, leftIconWidth, leftIconHeight, leftBorderRadius, rightIcon, rightIconWidth, rightIconHeight, label, labelSize, labelWight, labelColor, borderRadius}: props) => {

    const handleClick = () => {
        clickFn()
    }

    return (
        <>
            <TouchableOpacity style={[styles.container, {
                width: cw(width),
                height: ch(height),
                borderRadius: borderRadius,
            }]} onPress={handleClick}
            >

                <Image source={leftIcon} style={{
                    width: cw(leftIconWidth),
                    height: cw(leftIconHeight),
                    borderRadius: leftBorderRadius || 0,
                }}/>

                <Text
                    // @ts-ignore
                    style={{
                    fontSize: cw(labelSize),
                    fontWeight: labelWight,
                    color: labelColor,
                    fontFamily: 'PingFang SC'
                }}>{label}</Text>

                <Image source={rightIcon} style={{
                    width: cw(rightIconWidth),
                    height: ch(rightIconHeight)
                }} />
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: lightTheme.border_main_color,
        backgroundColor: lightTheme.bg_main_color,
        paddingTop: ch(13),
        paddingBottom: ch(13),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    }
})


export default PullDownButton


