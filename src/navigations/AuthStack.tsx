import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import SigninScreen from "../screens/auth/SigninScreen"
import SignupScreen from "../screens/auth/SignupScreen"
import HomeScreen from '../screens/HomeScreen'
import ROUTES from "./Routes"
import Stack from "./Stack"

// const Stack = createNativeStackNavigator()

const AuthStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.Signup} component={SignupScreen} />
            <Stack.Screen name={ROUTES.Signin} component={SigninScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack