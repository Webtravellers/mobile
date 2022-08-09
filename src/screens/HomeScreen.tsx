import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import PostCard from '../components/PostCard';

const { width } = Dimensions.get("screen")

const HomePage:React.FC<any> = ({ navigation }) => {
    return (
        <View style={styles.posts}>
        </View>
    )
}

const styles = StyleSheet.create({
    posts: {
        flex: 1,
    }
})
export default HomePage