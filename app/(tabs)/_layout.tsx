
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import {Image, Pressable, SafeAreaView, StyleSheet, View} from "react-native";
import {lightTheme} from "@/styles/global";
import { calculateWidth as cw, calculateHeight as ch } from "@/utils/calculatedPercentage";

import index from "./index"
import RWA from "./RWA"
import Trade from "./Trade"
import Find from "./Find"
import Mine from "./Mine"
import {LinearGradient} from "expo-linear-gradient";

const wallet1 = require('@/assets/app/tab/Wallet1.png')
const rwa1 = require('@/assets/app/tab/RWA1.png')
const find1 = require('@/assets/app/tab/Find1.png')
const mine1 = require('@/assets/app/tab/Mine1.png')

const wallet2 = require('@/assets/app/tab/Wallet2.png')
const rwa2 = require('@/assets/app/tab/RWA2.png')
const trade2 = require('@/assets/app/tab/Trade.png')
const find2 = require('@/assets/app/tab/Find2.png')
const mine2 = require('@/assets/app/tab/Mine2.png')

const Tab = createBottomTabNavigator();

export default function TabLayout(){
    return (
        <>
            <LinearGradient colors={[lightTheme.bg_main_color, lightTheme.border_sub_color, lightTheme.bg_main_color]}
                            start={{x:0, y: 1}}
                            end={{x: 1, y: 1}}
                            locations={[0.05, 0.5, 0.95]}
                            style={{
                                position: "absolute",
                                zIndex: 2,
                                width: "100%",
                                height: ch(2),
                                bottom: ch(183),
                            }}
            />
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: lightTheme.bg_main_color,
                        height: ch(182),
                        paddingTop: ch(10),
                        zIndex: 3,
                    },
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontFamily: 'PingFang SC',
                        fontSize: cw(24),
                        fontWeight: 400,
                        lineHeight: ch(34),
                        color: lightTheme.font_minor_color,
                        textAlign: "center",
                    },
                    tabBarButton: (props) => {
                        return (<Pressable {...props} />);
                    }
                }}
            >
                <Tab.Screen
                    name="index"
                    component={index}
                    options={{
                        title: "Wallet",
                        tabBarLabel: ({focused}) => {
                            return (
                                <Text style={[{
                                    color: focused ? lightTheme.font_main_color : lightTheme.font_minor_color,
                                    fontWeight: focused ? 800 : 400
                                }]}>
                                    {"Wallet"}
                                </Text>
                            )
                        },
                        tabBarIcon: ({ focused }) => (
                            <Image source={
                                focused ? wallet1 : wallet2
                            } style={[styles.iconImage]}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="RWA"
                    component={RWA}
                    options={{
                        title: "RWA",
                        tabBarLabel: ({focused}) => {
                            return (
                                <Text style={[{
                                    color: focused ? lightTheme.font_main_color : lightTheme.font_minor_color,
                                    fontWeight: focused ? 800 : 400
                                }]}>
                                    {"RWA"}
                                </Text>
                            )
                        },
                        tabBarIcon: ({ focused }) => (
                            <Image source={
                                focused ? rwa1 : rwa2
                            } style={styles.iconImage}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Trade"
                    component={Trade}
                    options={{
                        title: "Trade",
                        tabBarLabel: ({focused}) => {
                            return (
                                <Text style={[{
                                    color: focused ? lightTheme.font_main_color : lightTheme.font_minor_color,
                                    fontWeight: focused ? 800 : 400
                                }]}>
                                    {"Trade"}
                                </Text>
                            )
                        },
                        tabBarIcon: ({ focused }) => (
                            <Image source={trade2} style={[styles.iconImage, {
                                position: "absolute",
                                width: cw(100),
                                height: cw(100),
                                bottom: ch(10),
                            }]}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Find"
                    component={Find}
                    options={{
                        title: "Find",
                        tabBarLabel: ({focused}) => {
                            return (
                                <Text style={[{
                                    color: focused ? lightTheme.font_main_color : lightTheme.font_minor_color,
                                    fontWeight: focused ? 800 : 400
                                }]}>
                                    {"Find"}
                                </Text>
                            )
                        },
                        tabBarIcon: ({ focused }) => (
                            <Image source={
                                focused?find1:find2
                            } style={styles.iconImage}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Mine"
                    component={Mine}
                    options={{
                        title: "Mine",
                        tabBarLabel: ({focused}) => {
                            return (
                                <Text style={[{
                                    color: focused ? lightTheme.font_main_color : lightTheme.font_minor_color,
                                    fontWeight: focused ? 800 : 400
                                }]}>
                                    {"Mine"}
                                </Text>
                            )
                        },
                        tabBarIcon: ({ focused }) => (
                            <Image source={
                                focused?mine1:mine2
                            } style={styles.iconImage}/>
                        )
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    iconImage: {
        width: cw(55),
        height: cw(55),
        alignItems: "center",
        justifyContent: "center",
    }
})

