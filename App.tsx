import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import './src/assets/languages/i18n';
import HomeScreen from './src/screens/HomeScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator()
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name='Home' component={HomeScreen} />
        </HomeStack.Navigator>
    )
}

const ProfileStack = createNativeStackNavigator()
const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name='Profile' component={HomeScreen} />
        </ProfileStack.Navigator>
    )
}

const DiscoverStack = createNativeStackNavigator()
const DiscoverStackScreen = () => {
    return (
        <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
            <DiscoverStack.Screen name='Discover' component={HomeScreen} />
        </DiscoverStack.Navigator>
    )
}

const NetworkStack = createNativeStackNavigator()
const NetworkStackScreen = () => {
    return (
        <NetworkStack.Navigator screenOptions={{ headerShown: false }}>
            <NetworkStack.Screen name='Network' component={HomeScreen} />
        </NetworkStack.Navigator>
    )
}

const App: React.FC<any> = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "#895DB0" }}>
                <Tab.Screen
                    name="Keşfet"
                    component={HomeStackScreen}
                    options={{
                        tabBarIcon: (props) => (
                            <Icon name="home" {...props} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Ara"
                    component={DiscoverStackScreen}
                    options={{
                        tabBarIcon: (props) => (
                            <Icon name="search1" {...props} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Ağ"
                    component={NetworkStackScreen}
                    options={{
                        tabBarIcon: (props) => (
                            <Icon name="pluscircleo" {...props} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Planla"
                    component={HomeStackScreen}
                    options={{
                        tabBarIcon: (props) => (
                            <Icon name="hearto" {...props} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profil"
                    component={ProfileStackScreen}
                    options={{
                        tabBarIcon: (props) => (
                            <Icon name="user" {...props} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;