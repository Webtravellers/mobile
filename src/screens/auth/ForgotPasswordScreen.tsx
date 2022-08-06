import { Button, Text as KitText } from '@ui-kitten/components'
import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AuthScreenBackground from '../../components/AuthScreenBackground'
import ROUTES from '../../navigations/Routes'


const ForgotPasswordScreen = ({ navigation }) => {
    return (
        <AuthScreenBackground>
            <ScrollView >
                <View style={styles.topHero}>
                    <Text style={styles.title}> Şifreni Sıfırla </Text>
                    <Text style={styles.subTitle}>Epostana şifreni sıfırlayabileceğin bir link yollayacağız.</Text>
                </View>
                <View style={styles.launcher}>
                    <TextInput style={styles.input} placeholder="Eposta" />
                    <Button size={"giant"}>Şifremi Sıfırla</Button>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.Signin)}>
                        <KitText style={{ textAlign: "center", marginTop: 20, fontWeight: "bold" }} status={"primary"}>Giriş sayfasına geri dön</KitText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </AuthScreenBackground>
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topHero: {
        marginVertical: 50,
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        color: "#2f2f2f",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "roboto-regular",
    },
    subTitle: {
        fontSize: 16,
        color: "#6f6f6f",
        textAlign: "center",
        marginTop: 10,
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
    },
    input: {
        backgroundColor: "#f3dec1",
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
    },
    or: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        opacity: 0.5,
        marginVertical: 20,
    },
    line: {
        width: "40%",
        height: 1,
        backgroundColor: "#6f6f6f",
    }
})