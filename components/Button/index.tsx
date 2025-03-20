import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity} from "react-native";
import {calculateWidth, calculateHeight} from "@/utils/calculatedPercentage";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {lightTheme} from "@/styles/global";

interface props {
    width: number;
    height: number;
    label: string;
    labelSize: number;
    labelWight: number;
    labelColor: string;
    imgPath?: ImageSourcePropType;
    imgWidth?: number;
    imgHeight?: number;
    rightIcon?: ImageSourcePropType;
    iconWidth?: number;
    iconHeight?: number;
    gapDistance?: number;
    bgColor: string;
    bdColor: string;
    borderRadius: number;
    onClick: any;
    disable?: boolean;
}

const MyButton = ({
                      width,
                      height,
                      label,
                      labelSize,
                      labelWight,
                      labelColor,
                      imgPath,
                      imgWidth,
                      imgHeight,
                      rightIcon,
                      iconWidth,
                      iconHeight,
                      gapDistance,
                      bgColor,
                      bdColor,
                      borderRadius,
                      onClick,
                      disable,
    }: props)=>{

    const { t } = useTranslation();

    let trueWidth = calculateWidth(width);
    let trueHeight = calculateHeight(height);
    let trueLabelSize = calculateWidth(labelSize)
    let trueGapDistance = 0;
    let trueImgWidth = 0;
    let trueImgHeight = 0;
    if (imgPath != null && imgPath != undefined){
        if (gapDistance != null && gapDistance != undefined){
            trueGapDistance = calculateWidth(gapDistance)
        }
        if (imgWidth != null && imgWidth != undefined){
            trueImgWidth = calculateWidth(imgWidth)
        }
        if (imgHeight != null && imgHeight != undefined){
            trueImgHeight = calculateHeight(imgHeight)
        }
    }

    let trueRightIconWidth = 0;
    let trueRightIconHeight = 0;
    if (rightIcon != null && rightIcon != undefined){
        if (iconWidth != null && iconWidth != undefined){
            trueRightIconWidth = calculateWidth(iconWidth)
        }
        if (iconHeight != null && iconHeight != undefined){
            trueRightIconHeight = calculateHeight(iconHeight)
        }

    }

    const handleClick = ()=>{
        onClick();
    }

    const imgIcon = ()=>{
        return (
            <>
                <Image source={imgPath} style={{
                    width: trueImgWidth,
                    height: trueImgHeight,
                    marginRight: calculateWidth(6)
                }} alt="Img_Icon"/>
            </>
        )
    }


    const imgRight = ()=>{
        return (
            <>
                <Image source={rightIcon} style={{
                    width: trueRightIconWidth,
                    height: trueRightIconHeight,
                }} alt="Img_Icon"/>
            </>
        )
    }

    return (
        <>
            <TouchableOpacity style={[styles.container, {
                width: trueWidth,
                height: trueHeight,
                backgroundColor: disable ? lightTheme.bg_minor_color : bgColor,
                borderColor: disable? lightTheme.bg_minor_color : bdColor,
                gap: imgPath != null && imgPath != undefined ? trueGapDistance : 0,
                borderRadius: borderRadius,
            }]} onPress={disable ? ()=>{} : handleClick}
                activeOpacity={disable? 1 : 0.5}
            >
                {
                    imgPath != null && imgPath != undefined ? imgIcon() : null
                }

                <Text
                    // @ts-ignore
                    style={{
                    fontSize: trueLabelSize,
                    fontWeight: labelWight,
                    color: disable ? lightTheme.font_minor_color : labelColor,
                    fontFamily: 'PingFang SC'
                }}>{t(label)}</Text>

                {
                    rightIcon != null && rightIcon != undefined ? imgRight() : null
                }

            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
    }
})


export default MyButton


