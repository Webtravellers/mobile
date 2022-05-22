import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import FilterScreen from "../screens/FilterScreen"
import LocationListScreen from "../screens/location/LocationListScreen"
import NetworkScreen from "../screens/post/NetworkScreen"
import LocationCommentListScreen from "../screens/location/LocationCommentListScreen"
import LocationDetailScreen from "../screens/location/LocationDetailScreen"
import ROUTES from "./Routes"
// import Stack from './Stack'
const Stack = createNativeStackNavigator()
const FilterStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.Filter} component={FilterScreen} />
            <Stack.Screen name={ROUTES.LocationList} component={LocationListScreen} />
            <Stack.Screen name={ROUTES.LocationDetail} component={LocationDetailScreen} />
            <Stack.Screen name={ROUTES.LocationComments} component={LocationCommentListScreen} />
        </Stack.Navigator>
    )
}

export default FilterStack