import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import PostCard from '../components/PostCard';

const { width } = Dimensions.get("screen")

const HomePage:React.FC<any> = ({ navigation }) => {
    return (
        <ScrollView style={styles.posts}>
            <PostCard />
            <PostCard />
            <PostCard />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    posts: {
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: "AlongSans"
    }
})
export default HomePage