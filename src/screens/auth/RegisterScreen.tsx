import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AuthScreenBackground from '../../components/AuthScreenBackground'
import BiInput from '../../components/BiInput'
import { Button } from '@ui-kitten/components'
import ROUTES from '../../navigations/Routes'
import { SignupModel } from '../../types/SignupModel'
import { AuthService } from '../../services/authService'
import { ErrorAlert, SuccessAlert } from '../../components/Alert'

const RegisterScreen = ({ navigation }) => {
    const [values, setValues] = useState<SignupModel>()

    const onChangeText = (key: keyof SignupModel, value: string) => {
        setValues({ ...values, [key]: value })
    }

    const handleSignupClick = () => {
        const authService = new AuthService()
        authService.signup(values).then(res => {
            SuccessAlert({
                text: res.data.message,
                onPress: () => {
                    navigation.navigate(ROUTES.Signin)
                }
            })
        }).catch(err => {
            ErrorAlert({
                text: err.response?.data?.message ?? "Error occured",
            })
        })
    }

    return (
        <AuthScreenBackground>
            <ScrollView style={{ paddingHorizontal: 10 }}>
                <View style={styles.topHero}>
                    <Text style={styles.title}> Selam Gezgin 👋 </Text>
                    <Text style={styles.subTitle}>10 saniyede üye olup Türkiye'nin güzelliklerine şahit ol. </Text>
                </View>
                <View>
                    <BiInput placeholder='Ad Soyad' onChangeText={(t) => onChangeText("fullname", t)}/>
                    <BiInput placeholder='Kullanıcı Adı'  onChangeText={(t) => onChangeText("username", t)}/>
                    <BiInput placeholder='Eposta' onChangeText={(t) => onChangeText("email", t)} />
                    <BiInput placeholder='Parola' onChangeText={(t) => onChangeText("password", t)} secureTextEntry/>
                    <BiInput placeholder='Parola Tekrar' onChangeText={(t) => onChangeText("passwordRepeat", t)} secureTextEntry/>
                    <Button size={"giant"} onPress={handleSignupClick}>Kayıt Ol</Button>
                </View>
                <TouchableOpacity style={{ marginVertical: 20 }} onPress={handleSignupClick}>
                    <Text style={{ color: "#2f2f2f", textAlign: "center", fontWeight: "bold" }}>Geri Dön</Text>
                </TouchableOpacity>
            </ScrollView>
        </AuthScreenBackground>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
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
})