import { Text as KittenText } from '@ui-kitten/components'
import { Block, Card, Text } from 'galio-framework'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Text as RNText, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import LocationCard from '../components/LocationCard'
import TopBar from '../components/TopBar'
import { LocationService } from '../services/locationService'
import { RootState } from '../store'
import { setLocations } from '../store/locations'
import Location from '../types/LocationModel'
import LinearGradient from "react-native-linear-gradient"
import { GlobalStyles } from '../themes/global'
import ROUTES from '../navigations/Routes'
import LocationInfinityList from '../components/LocationInfinityList'

const { width, height } = Dimensions.get("screen")

const DiscoverScreen: React.FC<any> = ({ navigation }) => {
    const [locations, setLocations] = useState<Location[] | null>(null)
    const [totalPageSize, setTotalPageSize] = useState<number>(Infinity)
    const [page, setPage] = useState(1)
    const [groupLocations, setGroupLocations] = useState<Record<string, Location[]>>({})
    const [loading, setLoading] = useState(false)
    // const { locations } = useSelector((state: RootState) => state.locations)
    const dispatch = useDispatch()
    useEffect(() => {
        if (locations === null) {
            new LocationService().getAll({ size: 10 }).then(res => {
                const locations = res.data.data as Location[]
                setLocations(locations)
                setTotalPageSize(res.data.totalPageSize)

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
            })
        }
    }, []);

    const getMoreLocations = () => {
        if (page >= Math.ceil(totalPageSize / 10)) return;
        setLoading(true)
        new LocationService().getAll({ page: page + 1, size: 10 }).then(res => {
            if (locations != null) {
                const s = res.data.data as Location[]
                setLocations([...locations, ...s])
                setPage(page + 1)
            }
            setLoading(false)
        }
        )
    }

    if (locations === null) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    const RenderLocationItem = ({ item }) => (
        <TouchableOpacity key={item._id} style={{ margin: 10 }} onPress={() => navigation.navigate(ROUTES.LocationDetail, { ...item })}>
            <ImageBackground borderRadius={10} source={{ uri: item.photos[0] }} style={styles.topImage}>
                <LinearGradient colors={['#ffffff00', '#000000ff']} start={{ x: 0, y: 0.7 }} end={{ x: 0, y: 1 }} style={{ flex: 1, borderRadius: 10 }}>
                    <View style={styles.cardFooter}>
                        <RNText style={{ fontFamily: "AlongSansExtraBold", color: "#fff", fontSize: 20 }}>{item.name}</RNText>
                        <RNText style={GlobalStyles.textMuted}>{item.city.cityName}</RNText>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    )
    const indicator = () => {
        return loading ? (
            <View
                style={{
                    padding: 20,
                }}>
                <ActivityIndicator animating size="large" />
            </View>
        ) : null
    };

    return (
        <View style={{ flex: 1 }}>
            <TopBar />
            <FlatList
                data={locations}
                renderItem={({ item }) => <RenderLocationItem item={item} />}
                keyExtractor={item => item._id}
                onEndReached={getMoreLocations}
                ListFooterComponent={indicator}
                ListHeaderComponent={
                    <View>
                        <View style={styles.searchSection}>
                            <Icon style={styles.searchIcon} name="ios-search" size={20} color="#7f7f7f" />
                            <TextInput
                                style={styles.input}
                                placeholder="Lokasyon Ara"
                                underlineColorAndroid="transparent"
                                onPressIn={() => {navigation.navigate(ROUTES.Search)}}
                            />
                        </View>
                        <View style={styles.root}>
                            {Object.keys(groupLocations).map(k => (
                                <View style={styles.locationList}>
                                    <KittenText style={styles.textHeader}>{k}</KittenText>
                                    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} horizontal style={{ flexGrow: 1 }}>
                                        {groupLocations[k]?.slice(0, 5).map(location => (
                                            <LocationCard card={location} navigation={navigation} />
                                        ))}
                                    </ScrollView>
                                </View>
                            ))}
                            <View style={{ marginTop: 50 }}>
                                <KittenText style={{ ...GlobalStyles.textHeader, fontFamily: "AlongSansExtraBold" }}>Senin İçin 🎉</KittenText>
                            </View>
                        </View>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 10,
    },
    loader: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    topImage: {
        flex: 1,
        height: height / 3,
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
        marginVertical: 10,
    },
    searchInput: {
        backgroundColor: "#f1f1f1",
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
    },

    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFD',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        elevation: 1,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: 'transparent',
        color: '#2f2f2f',
        fontFamily: "AlongSansExtraBold",
    },
    cardFooter: {
        flex: 1,
        padding: 10,
        justifyContent: "flex-end"
    },
    textHeader: {
        fontFamily: "AlongSansExtraBold",
        fontSize: 32,
        color: "#333",
        fontWeight: "bold",
    }
})

export default DiscoverScreen