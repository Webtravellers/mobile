import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import HomeScreen from '../screens/HomeScreen'
import Stack from './Stack'

const HomeStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack