import { Button, Datepicker } from '@ui-kitten/components'
import { Text } from 'galio-framework'
import React, { useState } from 'react'
import { Alert, Dimensions, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import { LocationService } from '../services/locationService'
import { TripService } from '../services/tripService'
import { RootState } from '../store'
import { GlobalStyles } from '../themes/global'
import { TripModel } from '../types/TripModel'

const locationService = new LocationService()
const HEIGHT = Dimensions.get('window').height

const planningScreen: React.FC<any> = ({ navigation }) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.user);

    const handleNewTrip = () => {
        const data = {
            name: name,
            startDate: startDate ?? "",
            endDate: endDate ?? "",
        }
        const tripService = new TripService()
        tripService.newTrip(user._id, data).then(res => {
            console.log(res)
            Alert.alert("Başarılı 🎉", "Gezi planı başarılı bir şekilde oluşturuldu")
            setName('')
            setStartDate(null)
            setEndDate(null)
        }).catch(err => {
            Alert.alert("Başarısız 😢", "Gezi planı oluşturma işlemi başarısız oldu. Lütfen değerleri kontrol ediniz.")
            console.log({...err})
        })
    }

    return (
        <View style={styles.root}>
            <ImageBackground source={require("../assets/static/loginscreen.jpg")} style={styles.topImage}>
                <LinearGradient colors={['#ffffff00', '#000000ff']} start={{ x: 0, y: 0.7 }} end={{ x: 0, y: 1 }} style={{ flex: 1, borderRadius: 10, justifyContent: "space-between" }}>
                    <View style={{ marginTop: 30, padding: 10 }}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={() => navigation.goBack()}>
                            <Icon name="arrowleft" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontFamily: "AlongSansExtraBold", color: "#fff", fontSize: 30, padding: 10 }}>
                        Gezi Planı Oluştur 🛩
                    </Text>
                </LinearGradient>
            </ImageBackground>
            <View style={{ padding: 20, }}>
                <TextInput
                    style={GlobalStyles.input}
                    placeholder="Gezi Adı"
                    onChangeText={setName}
                />

                <Datepicker
                    style={GlobalStyles.datePicker}
                    placeholder="Başlangıç Tarihi"
                    controlStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                    accessoryRight={() => <Icon name="calendar" size={20} color="#555" />}
                    date={startDate}
                    onSelect={(date) => setStartDate(date)}
                />

                <Datepicker
                    style={GlobalStyles.datePicker}
                    placeholder="Bitiş Tarihi"
                    controlStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                    accessoryRight={() => <Icon name="calendar" size={20} color="#555" />}
                    date={endDate}
                    onSelect={(date) => setEndDate(date)}
                />

                <Button size={"giant"} style={styles.button} onPress={handleNewTrip}>
                    Plan Oluştur ✨
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // root: {
    //     paddingTop: 20,
    //     paddingBottom: 15,
    //     paddingHorizontal: 20,
    // },
    root: {
        flex: 1,
        backgroundColor: "#ffffef"
    },
    topImage: {
        height: HEIGHT * 0.2,
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        elevation: 3
    },
    select: {
        backgroundColor: "#fff",
        borderRadius: 50,
    },
    input: {
        backgroundColor: "#f3dec1",
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
    },
    button: {
        width: "100%",
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
    }
})


export default planningScreen