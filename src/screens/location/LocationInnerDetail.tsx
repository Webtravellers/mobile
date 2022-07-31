import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/Ionicons'
import { SliderBox } from "react-native-image-slider-box";

const images = [
    "https://nilatrip.com/wp-content/uploads/2021/07/nature-turkey-nila.jpg",
    "https://nilatrip.com/wp-content/uploads/2021/07/nature-turkey-nila.jpg",
    "https://nilatrip.com/wp-content/uploads/2021/07/nature-turkey-nila.jpg",
    "https://nilatrip.com/wp-content/uploads/2021/07/nature-turkey-nila.jpg",
    "https://nilatrip.com/wp-content/uploads/2021/07/nature-turkey-nila.jpg",
//     require("../../assets/static/discover-0.jpg"),
//     require("../../assets/static/auth.png"),
//     require("../../assets/static/loginscreen.png")
]

const LocationInnerDetail = () => {
    return (
        <View>
            <View style={styles.topbar}>
                <TouchableOpacity>
                    <View style={styles.topBtn}>
                        <Icon name="arrow-back-outline" size={30} color="#000" />
                    </View>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity>
                        <View style={styles.topBtn}>
                            <Icon name="heart-outline" size={30} color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View>
                    <SliderBox images={images} />
                </View>
            </ScrollView>
        </View>
    )
}

export default LocationInnerDetail

const styles = StyleSheet.create({
    topbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 5,
        elevation: 5,
        backgroundColor: "#fff"
    },
    topBtn: {
        padding: 10,
    }
})