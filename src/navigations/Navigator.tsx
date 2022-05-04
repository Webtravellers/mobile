import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import DiscoverStack from "./DiscoverStack";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator()

const Navigator: React.FC<any> = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "#895DB0" }}>
                <Tab.Screen
                    name="Keşfet"
                    component={DiscoverStack}
                    options={{
                        tabBarIcon: (props) => (
                            <Icon name="home" {...props} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Ara"
                    component={DiscoverStack}
                    options={{
                        tabBarIcon: (props) => (
                            <Icon name="search1" {...props} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Ağ"
                    component={HomeStack}
                    options={{
                        tabBarIcon: (props) => (
                            <Icon name="pluscircleo" {...props} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Planla"
                    component={HomeStack}
                    options={{
                        tabBarIcon: (props) => (
                            <Icon name="hearto" {...props} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profil"
                    component={HomeStack}
                    options={{
                        tabBarIcon: (props) => (
                            <Icon name="user" {...props} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigator