import { ActivityIndicator, FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { PostService } from '../../services/postService'
import CommentListItem from '../../components/CommentListItem'
import BiInput from '../../components/BiInput'
import { Button } from '@ui-kitten/components'
import { useDispatch } from 'react-redux'
import { fetchPostByUserId } from '../../store/user'

const postService = new PostService()
const PostCommentListScreen = ({ route, navigation }) => {
    const {user, posts} = useSelector((state: RootState) => state.user)
    const { post } = route.params
    const [comments, setComments] = useState(null)
    const [commentText, setCommentText] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        postService.getPostComments(post._id).then(res => {
            setComments(res.data.data?.reverse())
        })
    }, [posts])

    const handleCommentSubmit = () => {
        if (!commentText) return;
        postService.createPostComment(post._id, {
            comment: commentText,
            user:  user?._id
        }).then(res => {
            dispatch(fetchPostByUserId(user?._id))
            // setComments(res.data.data)
            setCommentText('')
        }).catch(err => {
            ToastAndroid.showWithGravityAndOffset("Hata oluştu, daha sonra tekrar deneyiniz!", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 100)
        })
    }

    return (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View style={styles.topbar}>
                <TouchableOpacity>
                    <View style={{ padding: 5 }}>
                        <Icon name="arrow-back-outline" size={30} color="#555" onPress={() => navigation.goBack()} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.topTitle}>Yorumlar</Text>
            </View>
            {comments == null ? (
                <ActivityIndicator size={"large"} />
            ) : (
                <FlatList
                    data={comments}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <CommentListItem comment={item} />}
                    style={{ padding: 10 }}
                />
            )}
            <View style={{flexDirection: "row"}}>
                <BiInput value={commentText} placeholder='Yorum yaz' style={{backgroundColor: "#fff", flex: 1}} onChangeText={setCommentText} multiline/>
                <Button disabled={!commentText} status={"basic"} onPress={handleCommentSubmit}>Paylaş</Button>
            </View>
        </View>
    )
}

export default PostCommentListScreen

const styles = StyleSheet.create({
    topbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 5,
        elevation: 5,
        backgroundColor: "#fff",
    },
    topTitle: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "AlongSansExtraBold"
    }
})