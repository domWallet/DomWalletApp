import {Image, ImageBase, SafeAreaView, StyleSheet, Text, View} from "react-native";
import "../i18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from  "react-native-responsive-screen";
import {useTranslation} from "react-i18next";
import {Platform} from "react-native";
import { calculateWidth, calculateHeight } from "@/utils/calculatedPercentage";
import {useEffect} from "react";


const android = Platform.OS === "android";
const topImg = require("@/assets/app/create/bg1.png");

export default function Index() {
    const { t } = useTranslation()
    // <Text>{t('home:welcome')}</Text>

    useEffect(() => {
        console.log("ImgSrc:", topImg);
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <View>
                <Image source={topImg} style={styles.imageTop}/>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: android ? hp(3) : 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    imageTop: {
        width: calculateWidth(408),
        height: calculateHeight(466),
        marginTop: calculateHeight(102),
    }
})

