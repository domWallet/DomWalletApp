import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";
import uuid from "react-native-uuid";
import TokenInfo from "@/components/wallet/TokenInfo";
import {useEffect} from "react";

interface props {
    tokenInfos: any
}

const Tokens = ({tokenInfos}: props) => {


    return (
        <>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={tokenInfos}
                    renderItem={({item}) => (<TokenInfo icon={item.icon} name={item.name} amount={item.amount} change={item.change} price={item.price} sign={item.sign}/>)}
                    keyExtractor={(item) => uuid.v4().toString()}
                />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height:"100%",
        backgroundColor: lightTheme.bg_main_color
    }
})

export default Tokens


