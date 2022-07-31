import React from "react"
import PlanListScreen from "../screens/PlanListScreen"
import planningScreen from "../screens/planningScreen"
import ROUTES from "./Routes"
import Stack from './Stack'

const PlanningStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.PlanList} component={PlanListScreen} />
            <Stack.Screen name={ROUTES.Planning} component={planningScreen} />
        </Stack.Navigator>
    )
}

export default PlanningStack