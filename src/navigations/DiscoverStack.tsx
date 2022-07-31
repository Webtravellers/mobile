import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import DiscoverScreen from "../screens/DiscoverScreen"
import LocationCommentListScreen from "../screens/location/LocationCommentListScreen"
import LocationDetailScreen from "../screens/location/LocationDetailScreen"
import LocationInnerDetail from "../screens/location/LocationInnerDetail"
import ROUTES from "./Routes"
import Stack from "./Stack"

// const Stack = createNativeStackNavigator()

const DiscoverStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.Discover} component={DiscoverScreen} />
            <Stack.Screen name={ROUTES.LocationDetail} component={LocationDetailScreen} />
            <Stack.Screen name={ROUTES.LocationInnerDetail} component={LocationInnerDetail} />
            <Stack.Screen name={ROUTES.LocationComments} component={LocationCommentListScreen} />
        </Stack.Navigator>
    )
}

export default DiscoverStack