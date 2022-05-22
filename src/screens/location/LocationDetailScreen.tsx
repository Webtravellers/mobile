import { Block, Text } from 'galio-framework';
import React from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IoIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get("screen")

const LocationDetailScreen:React.FC<any> = ({ route, navigation }) => {
    const location = route.params

    return (
        <View>
            <ScrollView style={styles.root}>
                <ImageBackground
                    style={{ width: width, height: height * 0.45 }}
                    source={{ uri: location?.photos[0] ?? "https://cdn.otelleri.net/landing/ankara/gezi-rehberi/anitkabir-2095-f6.jpg" }}
                >
                    <View style={styles.safeArea}>
                        <TouchableOpacity activeOpacity={0.5} style={{ width: 50 }} onPress={() => navigation.goBack()}>
                            <Icon name="arrowleft" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={{ ...styles.safeArea, paddingVertical: 10 }}>
                    {location.city?.cityName && (
                        <Block flex row style={{ alignItems: "center" }}>
                            <IoIcon name="ios-location-sharp" size={15} color="#8bbbbb" />
                            <Text muted>{location.city?.cityName}</Text>
                        </Block>
                    )}
                    <Text h3>{location.name}</Text>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate("LocationComments", {...location})}>
                        <Block flex row style={{ alignItems: "center" }}>
                            {[1, 2, 3, 4, 5].map(() => (
                                <Icon name="star" size={10} color="#FFB84E" style={styles.rateStar} />
                            ))}
                            <Text>{location.rate} ({Math.round(Math.random()*1200)} inceleme)</Text>
                        </Block>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.description}>
                            {location.desc}
                        </Text>
                        {/* <TouchableOpacity activeOpacity={0.4}>
                            <Block flex row style={{ alignItems: "center" }}>
                                <Text color='blue'>
                                    Devamını Oku
                                </Text>
                                <MIcon name="keyboard-arrow-down" size={15} />
                            </Block>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 0,
    },
    safeArea: {
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    rateStar: {
        marginRight: 5
    },
    description: {
        marginVertical: 20,
        fontSize: 16,
        opacity: 0.75,
    }
})

export default LocationDetailScreen