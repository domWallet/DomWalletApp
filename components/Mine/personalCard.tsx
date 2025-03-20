import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {lightTheme} from "@/styles/global";

interface props {
    photoPath: any
    userName: string
    UID: string
}

const copy = require("@/assets/app/mine/file-copy2x.png")

const PersonalCard = ({photoPath, userName, UID}: props) => {

    return (
        <View style={styles.container}>

            <Image source={photoPath} style={styles.image}/>

            <View style={styles.infoContainer}>
                <Text style={styles.userName}>{userName}</Text>

                <TouchableOpacity style={styles.infoBottomContainer}>
                    <Text style={styles.bottomText}>{"UID:"}{UID}</Text>
                    <Image style={styles.copyImage}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingLeft: cw(30),
        paddingRight: cw(30),
        paddingTop: ch(20),
        paddingBottom: ch(47),
        flexDirection: "row",
        alignItems: "center",
        gap: cw(27)
    },
    image:{
        width: cw(120),
        height: cw(120),
        borderRadius: 8,
    },
    infoContainer: {
        justifyContent: "space-between",
        gap: ch(25),
    },
    userName: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: cw(40),
        lineHeight: ch(56),
        color: lightTheme.font_main_color,
        textAlign: "left",
    },
    infoBottomContainer:{
        flexDirection: "row",
        gap: cw(14),
    },
    bottomText: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: cw(28),
        color: lightTheme.font_minor_color
    },
    copyImage:{
        width: cw(28),
        height: cw(28),
    }
})


export default PersonalCard



