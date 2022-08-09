import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PostCard from '../../components/PostCard';
import { PostService } from '../../services/postService';
import { PostModel } from '../../types/PostModel';

const { width } = Dimensions.get("screen")

const postService = new PostService()
const NetworkScreen: React.FC<any> = ({ navigation }) => {
    const [posts, setPosts] = React.useState<PostModel[]>([])
    const [total, setTotal] = React.useState<number>(Infinity)
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        getMorePosts()
    }, [])


    const getMorePosts = () => {
        if(posts.length >= total) return
        setLoading(true)
        postService.getAllPosts(posts.length).then(res => {
            posts.push(...res.data.data)
            setPosts(posts)
            setLoading(false)
            setTotal(res.data.total)
        })
    }
    console.log(posts.keys())

    return (
        <SafeAreaView style={styles.root}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <PostCard post={item} />}
                style={{ padding: 10 }}
                onEndReached={getMorePosts}
                ListFooterComponent={loading ? <ActivityIndicator animating size="large" /> : null}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
})
export default NetworkScreen