import { Button, View, StyleSheet } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue, withDelay,
    withRepeat,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import {withSequence} from "react-native-reanimated/src";
import { calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import {useEffect} from "react";

interface props {
    startDelay?: number
    endDelay?: number
}

const FirstCircle = ({startDelay, endDelay}: props) =>{
    const progress = useSharedValue(0);
    const scale = useSharedValue(1);
    const circleRadius = cw(200); // 圆的半径

    useEffect(() => {
        progress.value = withRepeat(
            withDelay(startDelay as number, withTiming(2 * Math.PI, {
                duration: 2000,
                easing:  Easing.inOut(Easing.quad),
            })),
            -1,
            false
        );
        scale.value = withRepeat(
            withTiming(3.5, {
                duration: 1000,
                easing: Easing.linear,
            }),
            -1,
            true
        )
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        const x =  circleRadius * Math.cos(progress.value);
        const y =  circleRadius * Math.sin(progress.value);
        return {
            position: 'absolute',
            transform: [{ translateX: x - 10 }, { translateY: y - 10 }],
        };
    });

    return (
        <>
            <Animated.View style={[styles.item, animatedStyle]}></Animated.View>
        </>
    )
}


const DefaultLoading = ()=>  {

    return (
        <View style={styles.container}>
            {/*<Animated.View style={[styles.item, animatedStyle]}></Animated.View>*/}
            <FirstCircle startDelay={200} endDelay={1000} />
            <FirstCircle startDelay={400} endDelay={900} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: "100%",
        height: cw(85),
    },
    item:{
        position: "absolute",
        width: cw(30),
        height: cw(30),
        backgroundColor: lightTheme.font_main_color,
        borderRadius: "50%",
        bottom: 0,
        left: "50%",
        transform: [{translateX: "-50%"}]
    }
});

export default DefaultLoading