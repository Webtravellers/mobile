import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, CheckBox, Divider, IndexPath, Input, List, Select, SelectItem } from '@ui-kitten/components'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { LocationService } from '../services/locationService'
import { CityService } from '../services/cityService'
import { LocationType } from '../types/LocationTypeModel'
import { setLocationTypes } from '../store/locations'
import { setCities } from '../store/cities'
import { City } from '../types/CityModel'
import Location from '../types/LocationModel'
import { GlobalStyles } from '../themes/global'
import Icon from 'react-native-vector-icons/Ionicons'
import ROUTES from '../navigations/Routes'
import { TripService } from '../services/tripService'
import { TripModel } from '../types/TripModel'
import { addFetch, FETCH_REQUESTS } from '../store/api'

const tripService = new TripService()
const PlanAddLocationScreen = ({ route, navigation }) => {
    const [trip, setTrip] = useState(route.params.trip)
    const [searchText, setSearchText] = useState<string>("")
    const [selectedCity, setSelectedCity] = useState<IndexPath>(new IndexPath(0))
    const [selectedType, setSelectedType] = useState<IndexPath>(new IndexPath(0))
    const [filteredLocations, setFilteredLocations] = useState<Location[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [locationTypes, setLocationTypes] = useState<LocationType[]>([])
    const [isLoading, setIsLoading] = useState<string[]>([])
    const [showOnlyExists, setShowOnlyExists] = useState<boolean>(false)

    const { user } = useSelector((state: RootState) => state.user);
    const { locations } = useSelector((state: RootState) => state.locations);

    const dispatch = useDispatch()
    useEffect(() => {
        if (!locationTypes || locationTypes.length == 0) {
            new LocationService().getAllTypes().then(res => {
                const types = res.data.data as LocationType[]
                setLocationTypes([{ _id: "0", name: "Tümü" }, ...types])
            })
        }
        if (!cities || cities.length == 0) {
            new CityService().getAll().then(res => {
                const _cities = res.data.data as City[]
                setCities([{ _id: "0", cityName: "Tümü" }, ..._cities])
            })
        }
    }, [])

    useEffect(() => {
        console.log(selectedCity.row, selectedType.row)
        let _locations = locations
        if(showOnlyExists) {
            _locations = _locations.filter(l => trip.locations.some(x => x._id == l._id))
        }
        if (selectedCity.row != 0) {
            _locations = _locations.filter(l => l.city._id == cities[selectedCity.row]._id)
        }
        if (selectedType.row != 0) {
            _locations = _locations.filter(l => l.type.some(x => x._id === locationTypes[selectedType.row]._id))
        }
        if (searchText && searchText != '') {
            _locations = _locations.filter(l => l.name.toLowerCase().includes(searchText.toLowerCase()))
        }
        setFilteredLocations(_locations)
    }, [selectedCity, selectedType, searchText, showOnlyExists])

    const handleAddLocation = (location) => {
        setIsLoading([...isLoading, location._id])
        tripService.addLocationToTrip(trip.userId, trip._id, { location: location._id }).then(res => {
            console.log(res.data)
            tripService.getTripById(trip.userId, trip._id).then(res => {
                setTrip(res.data.data)
                setIsLoading(s => s.filter(x => x != location._id))
                dispatch(addFetch(FETCH_REQUESTS.TRIP_DETAIL))   
            })
        })
    }
    const handleRemoveLocation = (location) => {
        setIsLoading([...isLoading, location._id])
        tripService.removeLocationFromTrip(trip.userId, trip._id, location._id).then(res => {
            tripService.getTripById(trip.userId, trip._id).then(res => {
                setTrip(res.data.data)
                setIsLoading(s => s.filter(x => x != location._id))
            })
        })
    }

    const LocationListRenderItem = ({ item, index }) => {
        return (
            <View style={styles.locationItem}>
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                    <Image borderRadius={10} source={{ uri: item.photos[0] }} style={{ width: 100, height: 100 }} />
                    <View style={{ flexWrap: "wrap", flex: 1, marginHorizontal: 10, alignItems: "flex-start" }}>
                        <Text style={[{ fontSize: 20, fontFamily: "open-sans", color: "#222" }]}>{item.name}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon name="ios-location-outline" size={16} color="#222" />
                            <Text style={{ color: "#777" }}>{item.city.cityName}</Text>
                        </View>
                        <View style={styles.review}>
                            {[1, 2, 3, 4, 5].map(() => (
                                <Icon name="star" size={10} color="#FFB84E" style={styles.rateStar} />
                            ))}
                            <Text style={{ color: "#2f2f2f" }}>{item.rate} (10 inceleme)</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Button size={"small"} appearance="ghost" onPress={() => navigation.navigate(ROUTES.LocationDetail, item)}>Detayı Gör 📍</Button>
                    {isLoading.includes(item._id)
                        ? <ActivityIndicator size="small" color="#FFB84E" />
                        : trip.locations.some(l => l._id == item._id) ? (
                            <Button
                                size={"small"}
                                status="danger"
                                appearance={"outline"}
                                onPress={() => handleRemoveLocation(item)}
                            >
                                Plandan Çıkar 🗑
                            </Button>
                        ) : (
                            <Button
                                size={"small"}
                                status="success"
                                appearance={"outline"}
                                onPress={() => handleAddLocation(item)}
                            >
                                Plana Ekle 📌
                            </Button>
                        )}
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.topbar}>
                <Text style={{ fontFamily: "AlongSansExtraBold", fontSize: 24 }}>Bi'Hatira</Text>
                <Button appearance={"ghost"}>Kapat</Button>
            </View>
            <View style={{ padding: 10, flex: 1 }}>
                <Input
                    label='Lokasyon Adı:'
                    placeholder='Lokasyon Adı'
                    style={{ marginHorizontal: 5 }}
                    onChangeText={setSearchText}
                />
                <View style={styles.row}>
                    <Select
                        label='İl:'
                        style={{ width: '48%', margin: 4 }}
                        selectedIndex={selectedCity}
                        value={cities[selectedCity.row]?.cityName ?? <ActivityIndicator />}
                        onSelect={(index: any) => {
                            setSelectedCity(index)
                        }}
                    >
                        {
                            cities && cities.map(city => (
                                <SelectItem key={city._id} title={city.cityName} />
                            ))
                        }
                    </Select>
                    <Select
                        label='Gezi Türü:'
                        placeholder='Tür seçiniz'
                        style={{ width: '48%', margin: 4 }}
                        selectedIndex={selectedType}
                        value={locationTypes[selectedType.row]?.name ?? <ActivityIndicator />}
                        onSelect={(index: any) => setSelectedType(index)}
                    >
                        {
                            locationTypes.map(type => (
                                <SelectItem key={type._id} title={type.name} />
                            ))
                        }
                    </Select>
                </View>
                <CheckBox
                    checked={showOnlyExists}
                    onChange={() => setShowOnlyExists(!showOnlyExists)}
                    style={{ marginHorizontal: 5 }}
                >Sadece planda var olanları göster</CheckBox>
                <ScrollView>
                    <List data={filteredLocations} renderItem={LocationListRenderItem} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default PlanAddLocationScreen

const styles = StyleSheet.create({
    topbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        elevation: 3,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    locationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    review: {
        flexDirection: "row",
        alignItems: "center",
    },
    rateStar: {
        marginRight: 2
    },
})