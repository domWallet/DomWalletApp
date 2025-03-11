import {LinearGradient} from "expo-linear-gradient";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {useEffect, useRef, useState} from "react";
import {Animated, Dimensions, StyleSheet, View} from "react-native";
import {lightTheme} from "@/styles/global";


interface props {
    width: number
    height: number
    borderRadius: number
    color?: string
    bgColor?: string
}

const SkeletonItem = ({width, height, borderRadius, color, bgColor}: props) => {


    const [frontColor, setFrontColor] = useState("")
    const [endColor, setEndColor] = useState("")

    useEffect(() => {
        setFrontColor(lightTheme.border_main_color)
        if (bgColor) {
            setFrontColor(bgColor)
        }
        setEndColor(lightTheme.border_sub_color)
        if (color){
            setEndColor(color)
        }
    }, []);

    const deviceWidth = Dimensions.get('window').width

    const translateX = useRef(new Animated.Value(-deviceWidth)).current;


    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: width*2, // 向右移动整个屏幕宽度
                duration: 4000, // 动画时间 4 秒
                useNativeDriver: true, // 启用原生驱动，提高性能
            })
        ).start();
    }, []);

    return (
        <>
            <View style={[styles.container, {
                width: cw(width),
                height: ch(height),
                borderRadius: borderRadius,
            }]}>
                <Animated.View style={[styles.gradientWrapper, {
                    width: deviceWidth*4,
                    transform: [{ translateX }]
                }]}>
                    <LinearGradient
                        colors={[frontColor, endColor, frontColor, endColor, frontColor, endColor, frontColor]}
                                    start={{x: 0, y: 1}}
                                    end={{x: 1, y: 1}}
                                    locations={[0, 0.16, 0.33, 0.5, 0.66, 0.83, 1]}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: deviceWidth*4,
                                        height: "100%",
                                    }}
                    />
                </Animated.View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    gradientWrapper: {
        position: "absolute",
        height: "100%",
    },
})


export default SkeletonItem










