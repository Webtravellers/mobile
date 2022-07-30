import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Text } from '@ui-kitten/components'

const TopBar = () => {
    return (
        <View style={styles.root}>
            <TouchableOpacity>
                <Text style={styles.text}>Bi'Hatira</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name='ios-notifications-outline' size={24} />
            </TouchableOpacity>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#e6e6e6",
        elevation: 2
    },
    text: {
        fontFamily: 'AlongSansExtraBold',
        fontSize: 20,
    }
})