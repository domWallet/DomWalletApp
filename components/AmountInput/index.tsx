import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {lightTheme} from "@/styles/global";
import {useState} from "react";

interface props {
    width: number,
    height: number,
    borderRadius: number,
    inputSize: number,
    inputWight: number,
    inputColor: string,
    amount: number,
    value: any,
    changeValueFn: any,
    decimal: number
}

const Big = require("big.js")

const AmountInput = ({width, height, borderRadius, inputSize, inputWight, inputColor, amount, value, changeValueFn, decimal}: props)=>{

    const [focus, setFocus] = useState(false)
    const [waring, setWaring] = useState(false)
    const handleFocused = ()=>{
        setFocus(true)
    }

    const changeValue = (text: string)=>{
        let regex = /^\d*\.?\d*$/
        if (regex.test(text)){
            if (text[0] == '.'){
                // 如果开头为小数点的情况
                text = '0.' + text.substring(1, text.length)
            }else if (text[text.length-1] == '.'){
                // 如果结尾为小数点的情况
                text = text.substring(0, text.length-1)
            }

            let pointIndex = text.indexOf('.')
            if (pointIndex != -1){
                // 处理输入精度溢出的情况
                if (text.length - pointIndex - 1 > decimal){
                    text = text.substring(0, pointIndex + decimal + 1)
                }
            }

            let amountBig = new Big(amount)
            let textBig = new Big(text)
            if (textBig.gte(amountBig)){
                text = amount.toString()
            }
            changeValueFn(text)
        }else {
            setWaring(true)
        }
    }

    return (
        <>
            <View style={[styles.container]}>
                <TextInput
                    // @ts-ignore
                    style={{
                        fontFamily: 'PingFang SC',
                        paddingLeft: cw(30),
                        paddingRight: cw(30),
                        width: cw(width),
                        height: ch(height),
                        borderRadius: borderRadius,
                        fontSize: cw(inputSize),
                        fontWeight: inputWight,
                        color: inputColor,
                        borderWidth: 2,
                        borderColor: focus ? lightTheme.font_main_color : lightTheme.border_main_color,
                }} value={value} onFocus={handleFocused} onBlur={()=>setFocus(false)} onChangeText={(text) => changeValue(text)}/>
                <Text>{"Please Not"}</Text>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    }
})


export default AmountInput



