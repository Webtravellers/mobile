import { Text } from 'galio-framework';
import React from 'react'
import { Dimensions, Image, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import AIcon from 'react-native-vector-icons/AntDesign';
const {width, height} = Dimensions.get("screen")
const PostCard = () => {
  return (
    <View style={styles.root}>
        <View style={styles.cardHeader}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Image source={{uri: "https://randomuser.me/api/portraits/women/10.jpg"}} style={styles.userPhoto}/>
                <View>
                    <Text bold>Yasin Torun</Text>
                    <Text muted>@yasintorun</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Icon name='dots-three-vertical' />
            </TouchableOpacity>
        </View>
        <Image style={styles.postImage} source={{uri:"https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&w=1000&q=80"}}/>
        <View style={styles.bottom}>
            <TouchableOpacity style={styles.bottomInfo}>
                <AIcon name="heart" color={"tomato"} size={20}/>
                <Text muted style={{marginLeft: 5}}>128 kişi beğendi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomInfo}>
                <Text muted>7 Yorum</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    root: {
        borderRadius: 5,
        backgroundColor: "white",
        marginBottom: 20,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    userPhoto: {
        width: 48,
        height: 48,
        borderRadius: 64, 
        marginRight: 10,
    },
    postImage: {
        height: 300
    },
    bottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 10,
    },
    bottomInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
    }
})


export default PostCard