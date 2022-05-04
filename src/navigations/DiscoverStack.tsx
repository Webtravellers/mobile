import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import DiscoverScreen from "../screens/DiscoverScreen"
import LocationCommentListScreen from "../screens/location/LocationCommentListScreen"
import LocationDetailScreen from "../screens/location/LocationDetailScreen"
import NavigationRoute from "./NavigationRoutes"

const Stack = createNativeStackNavigator()

const DiscoverStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationRoute.Discover} component={DiscoverScreen} />
            <Stack.Screen name={NavigationRoute.LocationDetail} component={LocationDetailScreen} />
            <Stack.Screen name={NavigationRoute.LocationComments} component={LocationCommentListScreen} />
        </Stack.Navigator>
    )
}

export default DiscoverStack