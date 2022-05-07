import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PostCard from '../../components/PostCard';

const { width } = Dimensions.get("screen")

const NetworkScreen:React.FC<any> = ({ navigation }) => {
    return (
        <ScrollView>
            <SafeAreaView style={styles.root}>
                <View style={styles.posts}>
                    {[1, 2, 3, 4, 5, 6].map(() => (
                        <PostCard />
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingTop: 40,
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    posts: {
        width: "100%",
        alignSelf: "stretch",
    }
})
export default NetworkScreen