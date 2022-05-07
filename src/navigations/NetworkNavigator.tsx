import React from "react"
import NetworkScreen from "../screens/post/NetworkScreen"
import ProfileScreen from "../screens/user/ProfileScreen"
import ROUTES from "./Routes"
import Stack from './Stack'

const NetworkStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.Network} component={NetworkScreen} />
        </Stack.Navigator>
    )
}

export default NetworkStack