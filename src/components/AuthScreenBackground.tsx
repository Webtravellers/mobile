import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const AuthScreenBackground = ({children}) => {
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient colors={["#ffeace", "#fff2e1", "#ffe9cc"]} style={styles.container}>
                {children}
            </LinearGradient>
        </View>
    )
}

export default AuthScreenBackground

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})