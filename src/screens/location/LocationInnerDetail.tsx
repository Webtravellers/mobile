import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, List } from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/Ionicons'
import { SliderBox } from "react-native-image-slider-box";
import CommentListItem from '../../components/CommentListItem';
import BiInput from '../../components/BiInput';
import { RateBar } from '../../components/RateBar';
import { LocationService } from '../../services/locationService';
import { NewCommentModel } from '../../types/NewCommentModel';
import useAuth from '../../hooks/useAuth';
import { SuccessAlert } from '../../components/Alert';
import { calculateRate } from '../../utils/Util';
import { Comment } from '../../types/CommentModel';

const images = [
    "https://nilatrip.com/wp-content/uploads/2021/07/nature-turkey-nila.jpg",
    "https://nilatrip.com/wp-content/uploads/2021/07/nature-turkey-nila.jpg",
    "https://nilatrip.com/wp-content/uploads/2021/07/nature-turkey-nila.jpg",
    "https://nilatrip.com/wp-content/uploads/2021/07/nature-turkey-nila.jpg",
    "https://nilatrip.com/wp-content/uploads/2021/07/nature-turkey-nila.jpg",
    //     require("../../assets/static/discover-0.jpg"),
    //     require("../../assets/static/auth.png"),
    //     require("../../assets/static/loginscreen.png")
]
const locationService = new LocationService()

const LocationInnerDetail = ({ route, navigation }) => {
    const auth = useAuth()
    const { location } = route.params
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<Comment[] | null>(null)
    const [addCommentLoading, setAddCommentLoading] = useState(false)

    useEffect(() => {
        if(addCommentLoading) return;

        locationService.getComments(location._id).then(res => {
            setComments(res.data.data?.reverse())
        })
    }, [addCommentLoading])

    const handleNewCommentClick = () => {
        setAddCommentLoading(true)
        const data:NewCommentModel = {
            comment: comment,
            score: rate,
            location: location._id,
            user: auth.user?._id ?? ""
        }
        locationService.newComment(location?._id, data).then(res => {
        setAddCommentLoading(false)
        SuccessAlert({text: "Comment added successfully"})
        setComment("")
        setRate(0)
        })
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topbar}>
                <TouchableOpacity>
                    <View style={styles.topBtn}>
                        <Icon name="arrow-back-outline" size={30} color="#000" onPress={() => navigation.goBack()}/>
                    </View>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity>
                        <View style={styles.topBtn}>
                            <Icon name="heart-outline" size={30} color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View>
                    <SliderBox images={location.photos} />
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <View>
                        <Text style={styles.title}>
                            {location?.name}
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Konum: <Text style={{ color: "#58bfd6" }}>{location?.city?.cityName}</Text></Text>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Tür: <Text style={{ color: "#d66758" }}>{location?.type?.map(x => x.name).join(", ")}</Text></Text>
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Puan: <Text style={{ color: "orange" }}>{calculateRate(comments?.map(x => x.score))}</Text></Text>
                        </View>
                        <Text style={styles.desc}>{location?.desc}</Text>
                    </View>
                    <View>
                        <Text style={styles.commentTitle}>Yorumlar 💬</Text>
                        <View style={{marginVertical: 10}}>
                            <View>
                                <Text>Puanla</Text>
                                <RateBar value={rate} onValueChange={setRate} />
                            </View>
                            <BiInput value={comment} placeholder='Yorum Yap' bgColor='white' style={{padding: 10, backgroundColor: "white"}} onChangeText={setComment} />
                            <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                                <Button appearance={"ghost"} onPress={handleNewCommentClick}>
                                    {addCommentLoading ? <ActivityIndicator size="small" color="#000" /> : <Text>Yorum Yap</Text>}
                                </Button>
                            </View>
                        </View>
                        { comments == null ? <ActivityIndicator /> : comments?.length > 0 ? (
                            <FlatList data={comments} renderItem={({item}) => <CommentListItem comment={item}/>} />
                        ): (
                            <Text style={{marginBottom: 40}}>Hiç yorum yok, ilk yorum yapan sen ol ✔</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default LocationInnerDetail

const styles = StyleSheet.create({
    topbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 5,
        elevation: 5,
        backgroundColor: "#fff"
    },
    topBtn: {
        padding: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center",
        color: "#555"
    },
    desc: {
        fontSize: 16,
        marginVertical: 30,
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        color: "#333"
    },
    CommentListItem: {
        marginVertical: 10,
        padding: 10,
    }
})