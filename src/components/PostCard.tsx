import { Text } from 'galio-framework';
import React from 'react'
import { Dimensions, Image, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import AIcon from 'react-native-vector-icons/AntDesign';
import { Button } from '@ui-kitten/components';

const { width, height } = Dimensions.get("screen")
const PostCard = ({post}) => {
    return (
        <View style={styles.root}>
            <View style={styles.cardHeader}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: post.postedBy.photo }} style={styles.userPhoto} />
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
                    accessoryLeft={(props) => <AIcon name='like2' size={20} />}
                >
                    {post.likes.length ?? "0"}
                </Button>
                <Button
                    status={"basic"}
                    appearance={"ghost"}
                    accessoryLeft={(props) => <AIcon name='message1' size={20} />}
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