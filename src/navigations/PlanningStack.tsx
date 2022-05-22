import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import HomeScreen from '../screens/HomeScreen'
import planningScreen from "../screens/planningScreen"
import ProfileScreen from "../screens/user/ProfileScreen"
import ROUTES from "./Routes"
import Stack from './Stack'

const PlanningStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.Planning} component={planningScreen} />
        </Stack.Navigator>
    )
}

export default PlanningStack