import { Block, Text } from 'galio-framework'
import React from 'react'
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import CommentListItem from '../../components/CommentListItem'

const { width, height } = Dimensions.get("screen")
const LocationCommentListScreen:React.FC<any> = ({route, navigation}) => {
    
    const location = route.params
    return (
        <SafeAreaView>
            <View style={styles.root}>
                <View style={styles.top}>
                    <TouchableOpacity activeOpacity={0.5} style={{ width: 50 }} onPress={() => navigation.goBack()}>
                        <Icon name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                    <Text bold h6>{location?.title} Yorumları</Text>
                    <View style={{ width: 50 }} />
                </View>
            </View>
            <ScrollView style={styles.list}>
                <Block flex center width={width*0.9}>
                    <CommentListItem />
                    <CommentListItem />
                    <CommentListItem />
                    <CommentListItem />
                    <CommentListItem />
                    <CommentListItem />
                    <CommentListItem />
                    <CommentListItem />
                    <CommentListItem />
                    <CommentListItem />
                </Block>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingTop: 40,
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    list: {
    }
})

export default LocationCommentListScreen