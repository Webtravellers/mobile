import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { createRef, useCallback, useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import PostCard from '../../components/PostCard'

const UserPostListScreen = ({ route, navigation }) => {
    const { posts, index } = route.params

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topbar}>
                <TouchableOpacity>
                    <View style={{ padding: 5 }}>
                        <Icon name="arrow-back-outline" size={30} color="#555" onPress={() => navigation.goBack()} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.topTitle}>Gönderilerim</Text>
            </View>
            <FlatList
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <PostCard post={item} />}
                style={{ padding: 10 }}
                initialScrollIndex={index}
            />
        </View>
    )
}

export default UserPostListScreen

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