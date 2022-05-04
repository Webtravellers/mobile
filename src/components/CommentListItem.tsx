import { Block, Text } from 'galio-framework'
import React from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native'

const { width, height } = Dimensions.get("screen")

function makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
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

const CommentListItem = () => {
    return (
        <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.body}>
                <Image source={{ uri: photos[Math.floor(Math.random() * photos.length)] }} style={styles.pp} borderRadius={100} />
                <View style={styles.data}>
                    <View style={styles.title}>
                        <Text bold>{names[Math.floor(Math.random() * names.length)]}</Text>
                        <Text size={10} muted>{Math.floor(Math.random() * 60 + 1)} dakika önce</Text>
                    </View>
                    <View>
                        <Text>
                            {makeid(Math.floor(Math.random()*100 + 50))}
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
        marginVertical: 20,
        maxWidth: width * 0.9,
        overflow: "visible"
    },
    pp: {
        width: 50,
        height: 50,
    },
    data: {
        marginLeft: 10,
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    hr: {
        borderBottomColor: "#bdbdbd",
        borderBottomWidth: 1,
        marginTop: 10,
    }
})

export default CommentListItem