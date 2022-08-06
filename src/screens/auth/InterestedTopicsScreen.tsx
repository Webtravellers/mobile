import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AuthScreenBackground from '../../components/AuthScreenBackground'
import { Button, Icon } from '@ui-kitten/components'
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get("screen")

const topics = [
    {
        name: "Doğa",
        image: "https://miro.medium.com/max/1024/0*exn47Bgja5jZQag8.jpg",
    },
    {
        name: "Kültür",
        image: "https://static.daktilo.com/sites/71/uploads/2020/04/09/large/turkiye-gezi-onerileri.jpg",
    },
    {
        name: "Yaşam",
        image: "https://cdnuploads.aa.com.tr/uploads/Contents/2019/09/24/thumbs_b_c_ec9fad35658286b7f2591d30e91b1d78.jpg?v=152544",
    },
    {
        name: "Şehir",
        image: "https://yummyistanbul.com/wp-content/uploads/2022/01/istanbul-city.jpg",
    },
    {
        name: "Dağ",
        image: "https://idsb.tmgrup.com.tr/ly/uploads/images/2020/11/25/thumbs/800x531/74707.jpg",
    },
    {
        name: "Sahil",
        image: "https://www.fodors.com/wp-content/uploads/2019/06/10BestBeachesinTurkey__HERO__shutterstock_699964363.jpg",
    },
    {
        name: "İnsanlar",
        image: "https://www.arabnews.pk/sites/default/files/styles/n_670_395/public/main-image/2018/07/19/1257091-319690663.jpg",
    },
    {
        name: "Yöresel Lezzetler",
        image: "https://www.doganinsesiturkiye.com/resim/upload/sb1781.jpg",
    },
    {
        name: "Tarih",
        image: "https://www.hediyesepeti.com/blog/wp-content/uploads/2020/01/tarihi-yerler.jpg",
    },
]

const InterestedTopicsScreen = () => {
    const [selectedTopics, setSelectedTopics] = React.useState<string[]>([])

    const handleTopicPress = (topic: string) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter(t => t !== topic))
        } else {
            setSelectedTopics([...selectedTopics, topic])
        }
    }

    return (
        <AuthScreenBackground>
            <View style={{ paddingHorizontal: 10, flex: 1 }}>
                <Text style={styles.title}>Hangi konular ilgini çekiyor?</Text>
                <ScrollView>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                        {topics.map((topic, index) => (
                            <TouchableOpacity key={index} style={styles.topic} onPress={() => handleTopicPress(topic.name)}>
                                <ImageBackground source={{ uri: topic.image }} style={styles.topicImage}>
                                    <LinearGradient colors={['#ffffff00', '#000000ff']} start={{ x: 0, y: 0.7 }} end={{ x: 0, y: 1 }} style={{ flex: 1, borderRadius: 10, justifyContent: "space-between" }}>
                                        <View style={styles.topicName}>
                                            <Text style={styles.topicNameText}>{topic.name}</Text>
                                        </View>
                                        <View style={{ ...styles.topicCheck, backgroundColor: selectedTopics.includes(topic.name) ? "#FF6721" : "rgba(0, 0, 0, 0.5)" }}>
                                            <Icon name="checkmark" fill={selectedTopics.includes(topic.name) ? "white" : "transparent"} />
                                        </View>
                                    </LinearGradient>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
            {selectedTopics.length > 0 && (
                <TouchableOpacity style={styles.flatButton}>
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Tamamla</Text>
                </TouchableOpacity>
            )}
        </AuthScreenBackground>
    )
}

export default InterestedTopicsScreen

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: "#2f2f2f",
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    topic: {
        alignItems: "center",
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    topicImage: {
        width: width * 0.4,
        height: width * 0.4,
        resizeMode: "cover",
        borderRadius: 25,
    },
    topicName: {
        position: "absolute",
        bottom: 0,
        left: 5,
    },
    topicNameText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        textShadowColor: "rgba(0, 0, 0, 1)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    topicCheck: {
        position: "absolute",
        bottom: 3,
        right: 3,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: 'solid'
    },
    flatButton: {
        position: "absolute",
        right: 15,
        bottom: 10,
        backgroundColor: "#FF6721",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: 'solid'
    }
})