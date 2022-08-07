import { Text } from 'galio-framework'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const CommentListItem = ({ comment }) => {
    return (
        <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.body}>
                <Image source={{ uri: comment?.user?.photo }} style={styles.pp} borderRadius={100} />
                <View style={styles.data}>
                    <View>
                        <Text bold>{[comment?.user?.name, comment?.user?.lastname].join(" ")}</Text>
                        <View style={styles.title}>
                            {comment.score ? (<Text>
                                <Icon name="star" size={12} color="#F58D27" style={{ marginRight: 8 }} />
                                {comment.score}
                            </Text>
                            ): <Text></Text>}
                            <Text size={10} muted>{comment.date.toLocaleDate()}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>
                            {comment.comment}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.hr} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: "row",
        overflow: "visible",
        flex: 1,
    },
    pp: {
        width: 50,
        height: 50,
    },
    data: {
        paddingLeft: 10,
        flex: 1,
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    hr: {
        borderBottomColor: "#bdbdbd",
        borderBottomWidth: 1,
        marginVertical: 20,
    }
})

export default CommentListItem