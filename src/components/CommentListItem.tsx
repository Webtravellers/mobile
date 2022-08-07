import { Block, Text } from 'galio-framework'
import React from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text as KitText } from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/AntDesign'

const { width, height } = Dimensions.get("screen")

function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const photos = [
    "https://randomuser.me/api/portraits/women/90.jpg",
    "https://randomuser.me/api/portraits/women/88.jpg",
    "https://randomuser.me/api/portraits/women/87.jpg",
    "https://randomuser.me/api/portraits/women/86.jpg",
    "https://randomuser.me/api/portraits/men/52.jpg",
    "https://randomuser.me/api/portraits/men/50.jpg",
    "https://randomuser.me/api/portraits/men/51.jpg",
    "https://randomuser.me/api/portraits/women/84.jpg",
    "https://randomuser.me/api/portraits/women/81.jpg",
]

const names = [
    "Bennie K. Quinn",
    "Shane G. Burks",
    "Donald G. Meyer",
    "Walter L. Weiss",
    "Jamie R. Peeler",
]

const CommentListItem = ({comment}) => {
    console.log(comment )
    return (
        <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.body}>
                <Image source={{ uri: comment?.user?.photo }} style={styles.pp} borderRadius={100} />
                <View style={styles.data}>
                    <View>
                        <Text bold>{[comment?.user?.name, comment?.user?.lastname].join(" ")}</Text>
                        <View style={styles.title}>
                            <Text>
                                <Icon name="star" size={12} color="#F58D27" style={{marginRight: 8}} />
                                {comment.score}
                            </Text>
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