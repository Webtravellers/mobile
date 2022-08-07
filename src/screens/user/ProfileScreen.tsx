import { ActivityIndicator, Dimensions, Image, ImageBackground, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Layout, List, Text } from '@ui-kitten/components';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { GlobalStyles } from '../../themes/global';
import { PostModel } from '../../types/PostModel';
import { PostService } from '../../services/postService';
import RenderProfilePostItem from '../../components/RenderProfilePostItem';
import ROUTES from '../../navigations/Routes';
import { useDispatch } from 'react-redux';
import { fetchPostByUserId } from '../../store/user';

const { height, width } = Dimensions.get("screen");
const wallpaper = { uri: "https://wallpaperaccess.com/full/2135329.jpg" }

const postService = new PostService()
const ProfileScreen = ({navigation}) => {
    const { user, posts } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPostByUserId(user?._id))
        // postService.getPostsByUserId(user?._id ?? "").then(res => {
        //     setPost(res.data.data)
        // })
    }, [])

    return (
        <View style={styles.body}>
            <ScrollView>
                <View>
                    <ImageBackground
                        source={{ uri: user?.wallpaper ?? "https://wallpaperaccess.com/full/2135329.jpg" }}
                        style={styles.wallpaper}
                    >
                        <View style={styles.userImage}>
                            <Image
                                source={{ uri: user?.photo }}
                                borderRadius={100}
                                style={styles.profilePhoto}
                            />
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user?.name + " " + user?.lastname}</Text>
                    <View style={styles.follow}>
                        <Button
                            appearance={'ghost'}
                            style={{ marginHorizontal: 10 }}>
                            <View>
                                <Text style={styles.followText}>{user?.followers.length ?? 0}</Text>
                                <Text>Takipçi</Text>
                            </View>
                        </Button>
                        <Button
                            appearance={'ghost'}
                            style={{ marginHorizontal: 10 }}>
                            <View>
                                <Text style={styles.followText}>{user?.following.length ?? 0}</Text>
                                <Text>Takip</Text>
                            </View>
                        </Button>
                    </View>
                </View>
                <View style={{ margin: 20, marginTop: 0 }}>
                    <Text style={{ color: "#414b52" }}>
                        {user?.bio}
                    </Text>
                </View>
                <View style={styles.userPost}>
                    <Text style={[GlobalStyles.textHeader, { fontSize: 20 }]}>Gönderiler 📌</Text>
                    {posts == null ? <ActivityIndicator size="large" color="#0000ff" /> : (
                        <List
                            data={posts}
                            numColumns={3}
                            renderItem={({item, index}) => <RenderProfilePostItem item={item} onPress={() => navigation.navigate(ROUTES.UserPostList, {posts: posts, index})}/>}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    body: {
        // flex: 1,
        height: "100%",
        backgroundColor: '#fafaf2'
    },
    wallpaper: {
        width: width,
        height: height * 0.3,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        marginBottom: 40
    },
    userImage: {
        flexDirection: "row",
        justifyContent: "center",
        transform: [{ translateY: 30 }],
    },
    profilePhoto: {
        width: 120,
        height: 120,
        borderColor: "white",
        borderWidth: 3
    },
    userInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    follow: {
        flexDirection: 'row',
        marginVertical: 10
    },
    followText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700'
    },
    userPost: {
        flex: 1,
        marginHorizontal: 20,
    },
    imagePost: {
        height: height * 0.3,
        borderRadius: 10,
        marginVertical: 5
    },
    posts: {
        flexWrap: "wrap",
    }
})