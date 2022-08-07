import { Button, IndexPath, List, Select, SelectItem } from '@ui-kitten/components'
import { Input } from 'galio-framework'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, ImageBackground, StyleSheet, Text as RNText, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch } from 'react-redux'
import ROUTES from '../navigations/Routes'
import { CityService } from '../services/cityService'
import { LocationService } from '../services/locationService'
import { GlobalStyles } from '../themes/global'
import { City } from '../types/CityModel'
import Location from '../types/LocationModel'
import { LocationType } from '../types/LocationTypeModel'

const locationService = new LocationService()
const { width, height } = Dimensions.get("screen")

const FilterScreen: React.FC<any> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [locations, setLocations] = useState<Location[] | null>(null)
    const [filteredLocations, setFilteredLocations] = useState<Location[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [locationTypes, setLocationTypes] = useState<LocationType[]>([])
    const [searchText, setSearchText] = useState<string>("")
    const [selectedCity, setSelectedCity] = useState<IndexPath>(new IndexPath(0))
    const [selectedType, setSelectedType] = useState<IndexPath>(new IndexPath(0))

    useEffect(() => {
        locationService.getAll({ size: 100 }).then(res => {
            setLocations(res.data.data as Location[])
        })
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
        if (locations == null) return;
        let _locations = locations
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
    }, [locations, selectedCity, selectedType, searchText])

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


    return (
        <>
            <View style={styles.topbar}>
                <RNText style={{ fontFamily: "AlongSansExtraBold", fontSize: 24 }}>Bi'Hatira</RNText>
                <Button appearance={"ghost"} onPress={() => navigation.goBack()}>Kapat</Button>
            </View>
            {locations == null ? <ActivityIndicator size="large" /> : (
                <List
                    data={filteredLocations}
                    renderItem={RenderLocationItem}
                    ListHeaderComponent={
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
                        </View>
                    }
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    topbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        elevation: 3,
        paddingHorizontal: 10,
    },
    button: {
        width: "100%",
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
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
    },
    topImage: {
        flex: 1,
        height: height / 3,
    },
})

export default FilterScreen