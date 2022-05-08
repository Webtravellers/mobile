import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SignupScreen from "../screens/auth/SignupScreen";
import StorageService, { StorageKeys } from "../services/StorageService";
import { RootState } from "../store";
import { setUser } from "../store/user";
import { UserModel } from "../types/userModel";
import AuthStack from "./AuthStack";
import DiscoverStack from "./DiscoverStack";
import FilterStack from "./FilterStack";
import HomeStack from "./HomeStack";
import NetworkStack from "./NetworkNavigator";
import ProfileStack from "./profileStack";
import ROUTES from "./Routes";

const Tab = createBottomTabNavigator()

const Navigator: React.FC<any> = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        StorageService.get(StorageKeys.USER).then(res => {
            if (res) {
                const user: UserModel = JSON.parse(res)
                dispatch(setUser(user))
            }
        })
    }, [])

    return (
        <NavigationContainer>
            {!user.token || !user._id ? (
                <AuthStack />
            ) : (
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
                        component={FilterStack}
                        options={{
                            tabBarIcon: (props) => (
                                <Icon name="search1" {...props} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Ağ"
                        component={NetworkStack}
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
                        component={ProfileStack}
                        options={{
                            tabBarIcon: (props) => (
                                <Icon name="user" {...props} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    )
}

export default Navigator