import { Formik } from 'formik'
import { Button, Input, Text } from 'galio-framework'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import colors from '../themes/colors'
import i18n from '../assets/languages/i18n'
import { Picker } from '@react-native-picker/picker';
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { LocationService } from '../services/locationService'
import { useDispatch } from 'react-redux'
import { setLocationTypes } from '../store/locations'
import { LocationType } from '../types/LocationTypeModel'
import { CityService } from '../services/cityService'
import { City } from '../types/CityModel'
import { setCities } from '../store/cities'
const FilterScreen: React.FC<any> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { locationTypes } = useSelector((state: RootState) => state.locations)
    const { cities } = useSelector((state: RootState) => state.cities)

    const [selectedCity, setSelectedCity] = useState<string>()
    const [selectedType, setSelectedType] = useState<string>()

    useEffect(() => {
        if (!locationTypes || locationTypes.length == 0) {
            new LocationService().getAllTypes().then(res => {
                const types = res.data.data as LocationType[]
                dispatch(setLocationTypes(types))
            })
        }
        if(!cities || cities.length == 0){
            new CityService().getAll().then(res => {
                const _cities = res.data.data as City[]
                dispatch(setCities(_cities))
            })
        }
    }, [])

    return (
        <View style={styles.root}>
            <View>
                <View style={styles.top}>
                    <TouchableOpacity activeOpacity={0.5} style={{ width: 50 }} onPress={() => navigation.goBack()}>
                        <Icon name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                    <Text bold h6>Filtrele</Text>
                    <View style={{ width: 50 }} />
                </View>
            </View>
            <View style={{ paddingVertical: 20 }}>
                <View style={styles.input}>
                    <Input
                        borderless
                        placeholder={i18n.t("search")}
                        placeholderTextColor={colors.MUTED}
                    />
                </View>
                <View style={styles.input}>
                    <Text bold>Seyehat Türünü Seçiniz</Text>
                    <Picker
                        style={styles.select}
                        selectedValue={selectedType}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedType(itemValue)
                        }>
                        {locationTypes.map((type, index) => (
                            <Picker.Item label={type.name} value={type._id} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.input}>
                    <Text bold>Şehir Seçiniz</Text>
                    <Picker
                        style={styles.select}
                        selectedValue={selectedCity}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCity(itemValue)
                        }>
                        {cities.map((city, index) => (
                            <Picker.Item label={city.cityName} value={city._id} />
                        ))}
                    </Picker>
                </View>
                
                <Button color='#2E1BA5' style={styles.button}>
                    {i18n.t("filter") + ""}
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

export default FilterScreen