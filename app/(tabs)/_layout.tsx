
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import {Image, StyleSheet} from "react-native";
import {lightTheme} from "@/styles/global";
import { calculateWidth as cw, calculateHeight as ch } from "@/utils/calculatedPercentage";

import index from "./index"
import RWA from "./RWA"
import Trade from "./Trade"
import Find from "./Find"
import Mine from "./Mine"

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
        // @ts-ignore
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: lightTheme.bg_main_color,
                    height: ch(182),
                    paddingTop: ch(25),
                },
                headerShown: false,
                tabBarLabelStyle: {
                    fontFamily: 'PingFang SC',
                    fontSize: cw(24),
                    fontWeight: 400,
                    lineHeight: ch(34),
                    color: lightTheme.font_minor_color,
                    textAlign: "center"
                }
            }}
        >
            <Tab.Screen
                name="index"
                component={index}
                options={{
                    title: "Wallet",
                    tabBarLabel: "Wallet",
                    tabBarIcon: ({ focused }) => (
                        <Image source={
                            focused ? wallet1 : wallet2
                        } style={[styles.iconImage]}/>
                    )
                }}
            />
            <Tab.Screen
                name="RWA"
                component={RWA}
                options={{
                    title: "RWA",
                    tabBarLabel: "RWA",
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
                    tabBarLabel: "Trade",
                    tabBarIcon: ({ focused }) => (
                        <Image source={trade2} style={styles.iconImage}/>
                    )
                }}
            />
            <Tab.Screen
                name="Find"
                component={Find}
                options={{
                    title: "Find",
                    tabBarLabel: "Find",
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
                    tabBarLabel: "Mine",
                    tabBarIcon: ({ focused }) => (
                        <Image source={
                            focused?mine1:mine2
                        } style={styles.iconImage}/>
                    )
                }}
            />
        </Tab.Navigator>
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

