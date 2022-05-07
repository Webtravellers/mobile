import { Block, Text } from 'galio-framework'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import LocationCard from '../components/LocationCard'
import { LocationService } from '../services/locationService'
import { RootState } from '../store'
import { setLocations } from '../store/locations'
import Location from '../types/LocationModel'

const { width, height } = Dimensions.get("screen")

const navElements = [
    {
        text: "Popüler",
        active: true,
    },
    {
        text: "Önerilenler",
    },
    {
        text: "Eğlence",
    },
    {
        text: "Kültürel",
    },
    {
        text: "Unutulan Lezzetler",
    }
]

const DiscoverScreen: React.FC<any> = ({ navigation }) => {

    // const [locations, setLocations] = useState<Location[]>([])
    const [groupLocations, setGroupLocations] = useState<Record<string, Location[]>>({})
    const { locations } = useSelector((state: RootState) => state.locations)
    const dispatch = useDispatch()
    useEffect(() => {
        if (locations.length == 0) {
            new LocationService().getAll().then(res => {
                console.log(res.data.data)
                const locations = res.data.data as Location[]
                dispatch(setLocations(locations))
            })
        }
        else {
            const _gLocations: Record<string, Location[]> = {};
            locations.forEach(location => {
                location.type.forEach(type => {
                    const is = _gLocations[type.name]
                    if (is) {
                        _gLocations[type.name].push(location)
                    } else {
                        _gLocations[type.name] = [location]
                    }
                })
            })
            setGroupLocations(_gLocations)
        }
    }, [locations]);

    if (locations.length == 0) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <Block>
            <ScrollView>
                <ImageBackground source={{ uri: "https://cdn.goturkiye.com/goturkey/eastern-camping-goturkey.jpg" }} style={styles.topImage}>
                    <Block center style={{ marginVertical: 30 }}>
                        <Text h3 bold>Dijital Asistan</Text>
                    </Block>
                </ImageBackground>
                <View style={styles.root}>
                    {Object.keys(groupLocations).map(k => (
                        <View style={styles.locationList}>
                            <Text h4 bold>{k}</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} horizontal style={{ flexGrow: 1 }}>
                                {groupLocations[k]?.slice(0, 5).map(location => (
                                    <LocationCard card={location} navigation={navigation} />
                                ))}
                            </ScrollView>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </Block>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 20,
    },
    loader: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    topImage: {
        width: width,
        height: 200,
        opacity: 0.8,
        justifyContent: "space-around"
    },
    topNav: {
        padding: 20,
    },
    tab: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    activeTab: {
        borderStyle: "solid",
        borderColor: "red",
        borderBottomWidth: 3,
        width: "50%",
        marginTop: 5,
    },
    locationList: {
        marginVertical: 20,
    }
})

export default DiscoverScreen