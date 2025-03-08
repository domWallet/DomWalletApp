import {lightTheme} from "@/styles/global";
import {calculateWidth as cw, calculateHeight as ch} from "@/utils/calculatedPercentage";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";

interface props {
    titles: string[],
    children: React.ReactNode,
}

const Tabs = ({titles, children}:props)=>{

    const [clickState, setClickState] = useState<boolean[]>([])


    useEffect(()=>{
        let temp = []
        for (let i = 0; i < titles.length; i++){
            temp.push(false)
        }
        temp[0] = true
        setClickState(temp)
    }, [])

    const handlePress = (sign: any)=>{
        let temp = []
        for (let i = 0; i < titles.length; i++){
            temp.push(false)
        }
        temp[sign] = true
        setClickState(temp)
    }

    const RenderChildren = ()=>{
        let index = 0
        for (let i = 0; i < clickState.length; i++) {
            if (clickState[i]){
                index = i
                break
            }
        }
        return (
            <>
                {
                    //@ts-ignore
                    children[index]
                }
            </>

        )
    }

    return (
        <>
            <View style={styles.container}>

                <View style={styles.touchContainer}>

                    {
                        titles.map((title, index)=>{
                            return (
                                <TouchableOpacity style={[styles.touchItem, {
                                    borderBottomColor: clickState[index] ? lightTheme.font_main_color : '',
                                    borderBottomWidth: clickState[index] ? ch(4) : ch(0)
                                }]} key={index} onPress={()=>handlePress(index)}>
                                    <Text style={[styles.touchItemText, {
                                        color: clickState[index] ? lightTheme.font_main_color : lightTheme.font_minor_color
                                    }]}>{title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>

                <View style={styles.outLetContainer}>
                    <RenderChildren />
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightTheme.bg_main_color,
        alignItems: "center"
    },
    touchContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: cw(50)
    },
    touchItem: {
        height: ch(70),
        alignItems: "center",
        justifyContent: "center"
    },
    touchItemText: {
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        fontSize: cw(26),
        lineHeight: ch(36),
        color: lightTheme.font_minor_color,
    },
    outLetContainer: {
        flex: 1,
        marginTop: ch(53),
    }
})

export default Tabs;

