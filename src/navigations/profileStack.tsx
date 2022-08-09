import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import HomeScreen from '../screens/HomeScreen'
import NewPostScreen from "../screens/post/NewPostScreen"
import PostCommentListScreen from "../screens/post/PostCommentListScreen"
import ProfileScreen from "../screens/user/ProfileScreen"
import UpdateProfileScreen from "../screens/user/UpdateProfileScreen"
import UserPostListScreen from "../screens/user/UserPostListScreen"
import ROUTES from "./Routes"
import Stack from './Stack'

const ProfileStack:React.FC<any> = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.Profile} component={ProfileScreen} />
            <Stack.Screen name={ROUTES.UserPostList} component={UserPostListScreen} />
            <Stack.Screen name={ROUTES.PostCommentList} component={PostCommentListScreen} />
            <Stack.Screen name={ROUTES.PostCreate} component={NewPostScreen} />
            <Stack.Screen name={ROUTES.UpdateProfile} component={UpdateProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStack