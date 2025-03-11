import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import SkeletonItem from "@/components/Skeleton/SkeletonItem";
import {lightTheme} from "@/styles/global";
import AmountInput from "@/components/AmountInput"; // import LinearGradient

function Test() {
    const [value, setValue] = useState(0)

    const changeValue = (text: string) => {
        console.log(text)
    }

    return (
        <View style={styles.container}>
            <AmountInput
                width={690}
                height={94}
                value={value}
                amount={12.56}
                inputSize={45}
                inputWight={600}
                inputColor={lightTheme.font_main_color}
                changeValueFn={changeValue}
                borderRadius={24}
                decimal={18}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: lightTheme.bg_main_color
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 200,
        width: 350,
    },
})



export default Test