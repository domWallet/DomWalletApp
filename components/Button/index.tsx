import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity} from "react-native";
import {calculateWidth, calculateHeight} from "@/utils/calculatedPercentage";
import {useTranslation} from "react-i18next";
import "../../i18n";

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
    gapDistance?: number;
    bgColor: string;
    bdColor: string;
    borderRadius: number;
}

const MyButton = ({ width, height, label, labelSize, labelWight, labelColor, imgPath, imgWidth, imgHeight, gapDistance, bgColor, bdColor, borderRadius}: props)=>{

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

    const imgIcon = ()=>{
        return (
            <>
                <Image source={imgPath} width={trueImgWidth} height={trueImgHeight} alt="Img_Icon"/>
            </>
        )
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <TouchableOpacity style={[styles.container, {
                width: trueWidth,
                height: trueHeight,
                backgroundColor: bgColor,
                borderColor: bdColor,
                gap: imgPath != null && imgPath != undefined ? trueGapDistance : 0,
                borderRadius: borderRadius,
            }]}>
                {
                    imgPath != null && imgPath != undefined ? imgIcon() : null
                }

                <Text
                    // @ts-ignore
                    style={{
                    fontSize: trueLabelSize,
                    fontWeight: labelWight,
                    color: labelColor,
                    fontFamily: 'PingFang SC'
                }}>{t(label)}</Text>
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


