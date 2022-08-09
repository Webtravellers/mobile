import { useNavigation } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import { Text } from 'galio-framework';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ROUTES from '../navigations/Routes';
import { PostService } from '../services/postService';
import { UserService } from '../services/userService';
import { RootState } from '../store';
import { fetchPostByUserId } from '../store/user';

const { width, height } = Dimensions.get("screen")
const postService = new PostService()
const userService = new UserService()
const PostCard = (props) => {
    const [post, setPost] = useState(props.post)
    const { user } = useSelector((state: RootState) => state.user)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const LikeButton = () => (
        post.likes?.includes(user?._id) ? (
            <AIcon name='like1' color={"green"} size={20} />
        ) : (
            <AIcon name='like2' size={20} />
        )
    )

    const handleLikeClick = () => {
        if (!user) return;

        postService.handleLikeEvent(user?._id, post._id).then(res => {
            setPost(res.data.data)
            dispatch(fetchPostByUserId(user?._id))
        })
    }

    return (
        <View style={styles.root}>
            <View style={styles.cardHeader}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: post.postedBy?.photo }} style={styles.userPhoto} />
                    <View>
                        <Text bold>{post.postedBy?.name + " " + post.postedBy?.lastname}</Text>
                        <Text muted>@{post.postedBy?.username}</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Icon name='dots-three-vertical' />
                </TouchableOpacity>
            </View>
            <Text style={{ marginVertical: 10, color: "#222" }}>{post.caption}</Text>
            <Image style={styles.postImage} borderRadius={20} source={{ uri: post.photo }} />
            <View style={styles.bottom}>
                <Button
                    status={"basic"}
                    appearance={"ghost"}
                    accessoryLeft={LikeButton}
                    onPress={handleLikeClick}
                >
                    {post.likes?.length ?? "0"}
                </Button>
                <Button
                    status={"basic"}
                    appearance={"ghost"}
                    accessoryLeft={(props) => <AIcon name='message1' size={20} />}
                    onPress={() => navigation.navigate(ROUTES.PostCommentList, { post })}
                >
                    {post.comments?.length ?? 0}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 20,
        padding: 10,
        elevation: 2
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    userPhoto: {
        width: 48,
        height: 48,
        borderRadius: 64,
        marginRight: 10,
    },
    postImage: {
        height: 300,
    },
    bottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    bottomInfo: {
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
    }
})


export default PostCard