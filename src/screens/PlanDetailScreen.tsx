import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/AntDesign'
import { Button } from '@ui-kitten/components'
import { GlobalStyles } from '../themes/global'
import { LocationType } from '../types/LocationTypeModel'
import LocationModel from '../types/LocationModel'
import ROUTES from '../navigations/Routes'
import { TripService } from '../services/tripService'
import { TripModel } from '../types/TripModel'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { FETCH_REQUESTS } from '../store/api'
import { useIsFocused } from '@react-navigation/native';

const HEIGHT = Dimensions.get('window').height

const PlanDetailScreen = ({ route, navigation }) => {
  const { item } = route.params
  const [trip, setTrip] = useState(item)
  const isFocused = useIsFocused()
  const { fetch } = useSelector((state: RootState) => state.api);
  
  useEffect(() => {
    console.log("asd asd sad as das")
    if(fetch.includes(FETCH_REQUESTS.TRIP_DETAIL)) {
      let tripService = new TripService()
      tripService.getTripById(item.userId, item._id).then(res => {
        setTrip(res.data.data)
      })
    }
  }, [isFocused])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground source={require("../assets/static/onboarding1.jpg")} style={styles.topImage}>
          <LinearGradient colors={['#ffffff00', '#000000ff']} start={{ x: 0, y: 0.7 }} end={{ x: 0, y: 1 }} style={{ flex: 1, borderRadius: 10, justifyContent: "space-between" }}>
            <View style={{ marginTop: 30, padding: 10 }}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                <Icon name="arrowleft" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={{padding: 20}}>
          <Text style={{ fontFamily: "AlongSansExtraBold", color: "#333", textAlign: "center", fontSize: 30, padding: 10 }}>
            {trip?.name?.substring(0, 40) ?? ""}
          </Text>
          <View>
            <Text style={styles.dates}>{trip?.startDate?.toLocaleDate()} - {trip?.endDate?.toLocaleDate()}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", marginVertical: 10 }}>
            {/* <Button status={"success"} accessoryLeft={() => <Icon name="edit" color={"white"} size={20} />}>Düzenle</Button> */}
            <Button status={"danger"} size="tiny" accessoryLeft={() => <Icon name="delete" color={"white"} size={20} />}>Sil</Button>
          </View>
          <View style={styles.list}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={styles.listTitle}>Lokasyonlar</Text>
              <Button size={"small"} accessoryLeft={() => <Icon name="add" color="white" size={15} />} onPress={() => navigation.navigate(ROUTES.PlanLocationList, { trip: trip })}>Yeni Lokasyon Ekle</Button>
            </View>
            {trip?.locations.map((location: LocationModel, index: number) => (
              <TouchableOpacity style={{ marginVertical: 20 }}>
                <ImageBackground borderRadius={10} source={{ uri: location.photos[0] }} style={styles.topImage}>
                  <LinearGradient colors={['#ffffff00', '#000000ff']} start={{ x: 0, y: 0.7 }} end={{ x: 0, y: 1 }} style={{ flex: 1, borderRadius: 10 }}>
                    <View style={styles.cardFooter}>
                      <Text style={{ fontFamily: "AlongSansExtraBold", color: "#fff", fontSize: 20 }}>{location.name}</Text>
                      <Text style={GlobalStyles.textMuted}>{location?.city?.cityName}</Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default PlanDetailScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffcc"
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
  },
  dates: {
    fontFamily: "AlongSansExtraBold",
    color: "#777",
    textAlign: "center",

  },
  list: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  listTitle: {
    fontFamily: "AlongSansExtraBold",
    color: "#333",
    textAlign: "center",
    fontSize: 20,
  },
  cardFooter: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-end"
  },
})