import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen"
import InterestedTopicsScreen from "../screens/auth/InterestedTopicsScreen"
import LauncherScreen from "../screens/auth/LauncherScreen"
import LoginScreen from "../screens/auth/LoginScreen"
import RegisterScreen from "../screens/auth/RegisterScreen"
import SigninScreen from "../screens/auth/SigninScreen"
import SignupScreen from "../screens/auth/SignupScreen"
import HomeScreen from '../screens/HomeScreen'
import ROUTES from "./Routes"
import Stack from "./Stack"

// const Stack = createNativeStackNavigator()

const AuthStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.Landing} component={LauncherScreen} />
            <Stack.Screen name={ROUTES.Signup} component={RegisterScreen} />
            <Stack.Screen name={ROUTES.Signin} component={LoginScreen} />
            <Stack.Screen name={ROUTES.InterestedTopics} component={InterestedTopicsScreen} />
            <Stack.Screen name={ROUTES.ForgotPassword} component={ForgotPasswordScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack