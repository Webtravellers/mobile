import { Picker } from '@react-native-picker/picker'
import { Button, Input, Text } from 'galio-framework'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import i18n from '../assets/languages/i18n'
import ROUTES from '../navigations/Routes'
import { CityService } from '../services/cityService'
import { LocationService } from '../services/locationService'
import { RootState } from '../store'
import { setCities } from '../store/cities'
import { setFilterLocations, setLocationTypes } from '../store/locations'
import colors from '../themes/colors'
import { City } from '../types/CityModel'
import { LocationFilter } from '../types/locationFilterModel'
import Location from '../types/LocationModel'
import { LocationType } from '../types/LocationTypeModel'
import DatePicker from 'react-native-date-picker'

const locationService = new LocationService()

const planningScreen: React.FC<any> = ({ navigation }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [openStartDate, setOpenStartDate] = useState(false)
    const [endDate, setEndDate] = useState(new Date())
    const [openEndDate, setOpenEndDate] = useState(false)

    const dispatch = useDispatch()
    const { locationTypes } = useSelector((state: RootState) => state.locations)
    const { cities } = useSelector((state: RootState) => state.cities)

    const [selectedCity, setSelectedCity] = useState<string>()
    const [selectedType, setSelectedType] = useState<string>()

    useEffect(() => {
        if (!locationTypes || locationTypes.length == 0) {
            locationService.getAllTypes().then(res => {
                const types = res.data.data as LocationType[]
                dispatch(setLocationTypes(types))
            })
        }
        if (!cities || cities.length == 0) {
            new CityService().getAll().then(res => {
                const _cities = res.data.data as City[]
                dispatch(setCities(_cities))
            })
        }
    }, [])

    const handleFilter = () => {
        const filter = {
            city: selectedCity,
            type: selectedType
        } as LocationFilter
        locationService.filter(filter).then(res => {
            dispatch(setFilterLocations(res.data.data as Location[]))
            navigation.navigate(ROUTES.LocationList)
        })
    }

    return (
        <View style={styles.root}>
            <View>
                <View style={styles.top}>
                    <TouchableOpacity activeOpacity={0.5} style={{ width: 50 }} onPress={() => navigation.goBack()}>
                        <Icon name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                    <Text bold h6>Planla</Text>
                    <View style={{ width: 50 }} />
                </View>
            </View>
            <View style={{ paddingVertical: 20 }}>
                <View style={styles.input}>
                    <Text bold>Seyehat Başlangıç Tarihi Seçiniz</Text>
                    <TouchableOpacity onPress={() => setOpenStartDate(true)} activeOpacity={0.8}>
                        <Input
                            borderless
                            placeholder={startDate.toLocaleDateString("tr")}
                            placeholderTextColor={colors.MUTED}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={openStartDate}
                        date={startDate}
                        mode="date"
                        onConfirm={(date) => {
                            setOpenStartDate(false)
                            setStartDate(date)
                        }}
                        onCancel={() => {
                            setOpenStartDate(false)
                        }}
                    />
                </View>
                <View style={styles.input}>
                    <Text bold>Seyahat Bitiş Tarihi Seçiniz</Text>
                    <TouchableOpacity onPress={() => setOpenEndDate(true)} activeOpacity={1}>
                        <Input
                            borderless
                            placeholder={endDate.toLocaleDateString()}
                            placeholderTextColor={colors.MUTED}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={openEndDate}
                        date={endDate}
                        mode="date"
                        onConfirm={(date) => {
                            setOpenEndDate(false)
                            setEndDate(date)
                        }}
                        onCancel={() => {
                            setOpenEndDate(false)
                        }}
                    />
                </View>
                <View style={styles.input}>
                    <Text bold>Şehir Seçiniz</Text>
                    <Picker
                        style={styles.select}
                        selectedValue={selectedCity}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCity(itemValue)
                        }>
                        <Picker.Item label={i18n.t("all")} value={""} />
                        {cities.map((city, index) => (
                            <Picker.Item label={city.cityName} value={city._id} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.input}>
                    <Text bold>Ulaşım Türü Seçiniz</Text>
                    <Picker
                        style={styles.select}
                        selectedValue={selectedType}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedType(itemValue)
                        }>
                        <Picker.Item label={"Özel Araç"} value={"specialVehicle"} />
                        <Picker.Item label={"Araç Kiralama"} value={"rentACar"} />
                        <Picker.Item label={"Yerel Ulaşım Araçları"} value={"localVehicle"} />
                        <Picker.Item label={"Yürüyerek"} value={"onFoot"} />
                    </Picker>
                </View>

                <Button color='#2E1BA5' style={styles.button} onPress={handleFilter}>
                    Plan Oluştur
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingTop: 20,
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    select: {
        backgroundColor: "#fff",
        borderRadius: 50,
    },
    input: {
        marginBottom: 20,
    },
    button: {
        width: "100%",
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
    }
})


export default planningScreen