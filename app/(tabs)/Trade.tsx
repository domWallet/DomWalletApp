import {Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {lightTheme} from "@/styles/global";
import DefaultHeader from "@/components/Header/defaultHeader";

const android = Platform.OS === "android";

const Trade = () => {
    return (
        <>
            <SafeAreaView style={styles.container}>

                {/*Header*/}
                <DefaultHeader
                    info={"transfer:exchange"}
                    infoWight={600}
                    infoSize={30}
                    infoColor={lightTheme.font_main_color}
                />

                <View>
                    
                </View>


            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: android ? hp(3) : 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: lightTheme.bg_main_color,
    }
})


export default Trade