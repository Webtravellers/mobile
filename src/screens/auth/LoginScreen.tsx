import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Button, ButtonGroup, Icon, Input, Text as KitText } from '@ui-kitten/components'
import AuthScreenBackground from '../../components/AuthScreenBackground'
import BiInput from '../../components/BiInput'
import ROUTES from '../../navigations/Routes'
import { useDispatch } from 'react-redux'
import { SigninModel } from '../../types/SigninModel'
import { AuthService } from '../../services/authService'
import { UserModel } from '../../types/userModel'
import { setUser } from '../../store/user'
import StorageService, { StorageKeys } from '../../services/StorageService'
import { ErrorAlert } from '../../components/Alert'

const GoogleIcon = (props) => {
    return <Icon {...props} name='google' />
}

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const dispatch = useDispatch();

    const handleSigninClick = () => {
        setLoading(true)
        const values: SigninModel = {
            email: email,
            password: password
        }
        const authService = new AuthService()
        authService.signin(values).then(res => {
        
            const user: UserModel = {...res.data?.data.user}
            user.token = res.data?.data.token
            dispatch(setUser(user))

            StorageService.set(StorageKeys.USER, user).then(res => {
                // navigation.navigate(ROUTES.Discover)
            }).catch(err => console.log(err))
        
        }).catch(err => {
            ErrorAlert({
                text: err.response?.data?.message ?? "Error occured",
            })
        }).finally(() => setLoading(false))
    }

    return (
        <AuthScreenBackground>
            <ScrollView >
                <View style={styles.topHero}>
                    <Text style={styles.title}> Hoşgeldin 🎉</Text>
                    <Text style={styles.subTitle}>Devam etmek için giriş yapınız..</Text>
                </View>
                <View style={styles.launcher}>
                    <BiInput placeholder="Kullanıcı Adı veya Eposta Adresi" onChangeText={setEmail} />
                    <BiInput placeholder="Parola" onChangeText={setPassword} secureTextEntry/>
                    <Button size={"giant"} onPress={handleSigninClick}>
                        {loading ? <ActivityIndicator /> : <Text>Giriş Yap</Text>}
                    </Button>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ForgotPassword)}>
                        <KitText style={{ textAlign: "center", marginTop: 20, fontWeight: "bold", color: "#999" }}>Şifremi Unuttum</KitText>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10 }}>
                    <View style={styles.or}>
                        <View style={styles.line} />
                        <Text>VEYA</Text>
                        <View style={styles.line} />
                    </View>
                    <Button size={"giant"} status={"control"} accessoryLeft={GoogleIcon}>
                        Google ile Devam Et (Yakında)
                    </Button>
                </View>

                <View style={{ flex: 1, justifyContent: "flex-end", padding: 10 }}>
                </View>
            </ScrollView>
        </AuthScreenBackground>
    )
}

export default LoginScreen

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