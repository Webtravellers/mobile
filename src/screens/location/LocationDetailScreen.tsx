import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IoIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import ROUTES from '../../navigations/Routes';
import { GlobalStyles } from '../../themes/global';

const { width, height } = Dimensions.get("screen")

const LocationDetailScreen: React.FC<any> = ({ route, navigation }) => {
    const location = route.params

    return (
        <View style={styles.root}>
            <ImageBackground
                style={styles.bg}
                resizeMode="cover"
                source={{ uri: location?.photos[0] ?? "https://cdn.otelleri.net/landing/ankara/gezi-rehberi/anitkabir-2095-f6.jpg" }}
            >
                <View style={styles.topbar}>
                    {/* <Button status={"control"} appearance={"ghost"} accessoryLeft={ <Icon name="arrowleft" size={20} color="white" />} /> */}
                    <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={() => navigation.goBack()}>
                        <Icon name="arrowleft" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={() => navigation.navigate(ROUTES.LocationInnerDetail, {location: location})}>
                        <Icon name="info" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomBar}>
                    <Text style={[GlobalStyles.textTitle]}>{location?.name}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                        <IoIcon name="ios-location-sharp" size={15} color="#ddd" />
                        <Text style={[GlobalStyles.textMuted]}>Ankara</Text>
                    </View>
                    <TouchableOpacity style={styles.review}>
                        {[1, 2, 3, 4, 5].map(() => (
                            <Icon name="star" size={10} color="#FFB84E" style={styles.rateStar} />
                        ))}
                        <Text style={{ color: "#f2f2f2" }}>{location.rate} ({Math.round(Math.random() * 1200)} inceleme)</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomAction}>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.btn, {flex: 0.8, flexDirection: "row", justifyContent: "center", alignItems: "center"}]}>
                            <Icon name="home" size={20} color="white" />
                            <Text style={{color: "#fff", marginLeft: 10}}>Haritada Gör</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.5} style={styles.btn}>
                            <Icon name="book" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            {/* <View style={{ ...styles.safeArea, paddingVertical: 10 }}>
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
            {/* </View>
                </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 0,
        flex: 1
    },
    bg: {
        flex: 1,
        justifyContent: "space-between",
    },
    topbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20
    },
    bottomBar: {
        borderRadius: 10,
        padding: 10,
        margin: 20,
        backgroundColor: "#aaaaaadd",
        elevation: 5,
    },
    btn: {
        backgroundColor: "#F9B15B",
        padding: 10,
        elevation: 5,
        borderRadius: 10,
    },
    review: {
        flexDirection: "row",
        alignItems: "center",
    },
    rateStar: {
        marginRight: 2
    },
    bottomAction: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
    }
})

export default LocationDetailScreen