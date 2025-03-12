import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import SkeletonItem from "@/components/Skeleton/SkeletonItem";
import {lightTheme} from "@/styles/global";
import AmountInput from "@/components/AmountInput";
import {sendTrx, sendTUSD, sendUSDT} from "@/axios/Tron/transfer"; // import LinearGradient

function Test() {
    const [value, setValue] = useState(0)

    const changeValue = (text: string) => {
        console.log(text)
    }

    const handleTransfer = async () => {
        let fromAddress = "TP8hNoDiWDD9i3EAakXphxUXWJuZJUCnyb"
        let toAddress = "TVg831opBegjassYRp8U6fz9aWEDn44h8H"
        let value = 1
        let privateKey = "9a723870f82b3ca6dbadd7aa7e132457f18567f9df61a4225863892def3e45bb"
        const res = await sendTUSD(fromAddress, toAddress, value, privateKey)
        console.log(res)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.linearGradient} onPress={handleTransfer}>
                <Text>{"转账"}</Text>
            </TouchableOpacity>
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
        backgroundColor: 'cyan',
        height: 30,
        width: 50,
    },
})



export default Test