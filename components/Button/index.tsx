import {ImageSourcePropType, StyleSheet, TouchableOpacity} from "react-native";
import {calculateWidth, calculateHeight} from "@/utils/calculatedPercentage";

interface props {
    width: number;
    height: number;
    label: string;
    imgPath?: ImageSourcePropType;
    gapDistance?: number;
    bgColor: string;
    bdColor: string;
}

const Button = ({ width, height, label, imgPath, gapDistance, bgColor, bdColor}: props)=>{

    let trueWidth = calculateWidth(width);
    let trueHeight = calculateHeight(height);
    let trueGapDistance = 0;
    if (gapDistance != null && gapDistance != undefined){
        trueGapDistance = calculateWidth(gapDistance)
    }

    return (
        <>
            <TouchableOpacity style={[styles.container, {
                backgroundColor: bdColor,
                borderColor: bdColor,
            }]}>

            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2
    }
})


export default Button


