import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import { Block, Button, Input, Text } from 'galio-framework'
import React from 'react'
import { Image, View, StyleSheet, Dimensions, StatusBar, ImageBackground, TouchableOpacity } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useDispatch } from 'react-redux'
import i18n from '../../assets/languages/i18n'
import { ErrorAlert, SuccessAlert } from '../../components/Alert'
import ROUTES from '../../navigations/Routes'
import { AuthService } from '../../services/authService'
import StorageService, { StorageKeys } from '../../services/StorageService'
import { setUser } from '../../store/user'
import colors from '../../themes/colors'
import { SigninModel } from '../../types/SigninModel'
import { UserModel } from '../../types/userModel'

const { width, height } = Dimensions.get("screen")

const SigninScreen: React.FC<any> = ( {navigation}) => {
    const dispatch = useDispatch();
    const initialValues: SigninModel = {
        email: "",
        password: "",
    }
    const handleSigninClick = (values: SigninModel) => {
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
                text: err.response?.data?.message ?? "Sunucu ile bağlantı sağlanamadı, lütfen daha sonra tekrar deneyiniz.",
            })
        })
    }

    return (
        <Block>
            <Block flex>
                <ImageBackground
                    source={require("../../assets/static/auth.png")}
                    style={{ height, width, zIndex: -1, }}
                />
            </Block>
            <Block center>
                <Image source={require("../../assets/static/logo.png")} />
            </Block>
            <Block center style={{ width: "85%" }}>
                <Block >
                    <Text size={40} h1 color='white'>{i18n.t("auth.loginTitle")}</Text>
                </Block>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSigninClick}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={{ width: "100%" }}>
                            <Block center>
                                <Input
                                    borderless
                                    placeholder={i18n.t("email")}
                                    placeholderTextColor={colors.MUTED}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                <Input
                                    borderless
                                    placeholder={i18n.t("password")}
                                    placeholderTextColor={colors.MUTED}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                            </Block>
                            <TouchableOpacity style={{ alignSelf: "flex-start" }}>
                                <Text color={Colors.PRIMARY}>{i18n.t("auth.forgotPassword")}</Text>
                            </TouchableOpacity>
                            <Button style={styles.button} color={Colors.PRIMARY} onPress={handleSubmit}>{i18n.t("auth.login") + ""}</Button>
                        </View>
                    )}
                </Formik>
                <Text>{i18n.t("or")}</Text>
                <Button color='#9090D7' style={styles.button} onPress={() => navigation.navigate(ROUTES.Signup)}>
                    {i18n.t("auth.nowSignup") + ""}
                </Button>
            </Block>
        </Block >
    )
}

const styles = StyleSheet.create({
    padded: {
        position: "relative",
        zIndex: 2,
    },
    button: {
        width: "100%",
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
    }
})

export default SigninScreen