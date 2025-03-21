import {StyleSheet, View} from "react-native";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";

const TradeCard = () => {
    return (
        <>
            <View style={styles.container}>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        width: cw(690),
        height: ch(255),
        backgroundColor: lightTheme.bg_main_color,
    }
})


export default TradeCard


