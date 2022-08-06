import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from '@ui-kitten/components'
import ROUTES from '../../navigations/Routes'

const LauncherScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../assets/images/loginscreen.jpg")}
                style={{ flex: 1, zIndex: -1 }}
            >
                <LinearGradient colors={["#f2f2f2", "#f6f6f6", "transparent"]} style={styles.container}>
                    <View style={styles.topHero}>
                        <Image source={require("../../assets/images/bihatira.png")} />
                        <Text style={styles.subTitle}>Gezi rehberim ve anılarım</Text>
                    </View>
                    <View style={styles.launcher}>
                        <Button size={"giant"} onPress={() => navigation.navigate(ROUTES.Signup)}>Üye Ol</Button>
                        <TouchableOpacity style={{marginVertical: 20}} onPress={() => navigation.navigate(ROUTES.Signin)}>
                            <Text style={{color: "#2f2f2f", textAlign: "center"}}>Zaten üye misin? <Text style={{fontWeight: "bold"}}>Giriş Yap</Text></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, justifyContent: "flex-end", padding: 10}}>
                        <Text style={styles.footerText}>Turizm Bakanlığı - Web Travellers</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

export default LauncherScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topHero: {
        marginVertical: 100,
        alignItems: "center"
    },
    title: {
        fontSize: 50,
        color: "#2f2f2f",
        fontWeight: "bold",
        fontFamily: "sans-serif-condensed",
        textAlign: "center",
    },
    subTitle: {
        fontSize: 20,
        color: "#2f2f2f",
        textAlign: "center",
        fontFamily: "roboto-regular",
    },
    launcher: {
        padding: 10
    },
    footerText: {
        marginBottom: 20,
        fontSize: 18,
        color: "#f2f2f2",
        textAlign: "center",
        fontFamily: "roboto-regular",
    }
})