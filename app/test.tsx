import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient' // import LinearGradient

function Test() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['red', 'yellow', 'green' ]}
                style={styles.linearGradient}
            >
                <Text>Vertical Gradient</Text>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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