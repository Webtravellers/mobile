import React from "react"
import FilterScreen from "../screens/FilterScreen"
import NetworkScreen from "../screens/post/NetworkScreen"
import ROUTES from "./Routes"
import Stack from './Stack'

const FilterStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.Filter} component={FilterScreen} />
        </Stack.Navigator>
    )
}

export default FilterStack