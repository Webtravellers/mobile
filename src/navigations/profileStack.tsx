import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from "../screens/user/ProfileScreen"
import ROUTES from "./Routes"
import Stack from './Stack'

const ProfileStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.Profile} component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStack