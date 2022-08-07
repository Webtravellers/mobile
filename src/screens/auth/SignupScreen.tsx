import { Block, Button, Checkbox, Input, Text } from 'galio-framework'
import React from 'react'
import { Alert, Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import colors from '../../themes/colors'
import { Formik } from 'formik'
import { AuthService } from '../../services/authService'
import { SignupModel } from '../../types/SignupModel'
import { useTranslation } from 'react-i18next'
import { resolvePreset } from '@babel/core'
import { ErrorAlert, SuccessAlert } from '../../components/Alert'
import i18n from '../../assets/languages/i18n'
import ROUTES from '../../navigations/Routes'

const { width, height } = Dimensions.get("screen")
const SignupScreen: React.FC<any> = ({ navigation }) => {
    const initialValues:SignupModel = {
        fullname: "",
        email: "",
        password: "",
    }
    const handleSignupClick = (values:SignupModel) => {
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
        <Block>
            <Block flex>
                <ImageBackground
                    source={require("../../assets/static/auth.png")}
                    style={{ height, width, zIndex: -1, }}
                />
            </Block>
            <Block center style={{ marginTop: 50, width: "85%" }}>
                <Block style={{ marginVertical: 40 }}>
                    <Text size={40} h1 color='white'>{i18n.t("auth.registerTitle")}</Text>
                </Block>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSignupClick}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={{width: "100%"}}>

                            <Block center>
                                <Input
                                    borderless
                                    placeholder='İsim Soyisim'
                                    placeholderTextColor={colors.MUTED}
                                    onChangeText={handleChange('fullname')}
                                    onBlur={handleBlur('fullname')}
                                    value={values.fullname}
                                />
                                <Input
                                    borderless
                                    placeholder='Eposta'
                                    placeholderTextColor={colors.MUTED}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                <Input
                                    borderless
                                    placeholder='Şifre'
                                    placeholderTextColor={colors.MUTED}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                            </Block>
                            <Block top style={{ marginVertical: 10 }}>
                                <Checkbox color={colors.PRIMARY} label={i18n.t("auth.privacyPolicy")} labelStyle={{ color: colors.PRIMARY }} />
                                <Checkbox color={colors.PRIMARY} label={i18n.t("auth.approveEmailMessages")} style={{ marginTop: 10 }} labelStyle={{ color: colors.PRIMARY }} />
                            </Block>
                            <Button onPress={handleSubmit} style={styles.button} color={colors.PRIMARY}>{i18n.t("auth.register")+""}</Button>
                        </View>
                    )}
                </Formik>
                <Text>{i18n.t("or")}</Text>
                <Button color='#9090D7' style={styles.button} onPress={() => navigation.navigate(ROUTES.Signin)}>{i18n.t("auth.login")+""}</Button>
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

export default SignupScreen