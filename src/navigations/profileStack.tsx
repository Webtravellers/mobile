import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from "../screens/user/ProfileScreen"
import UserPostListScreen from "../screens/user/UserPostListScreen"
import ROUTES from "./Routes"
import Stack from './Stack'

const ProfileStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.Profile} component={ProfileScreen} />
            <Stack.Screen name={ROUTES.UserPostList} component={UserPostListScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStack