import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Button, Card, Divider, List } from '@ui-kitten/components'
import { GlobalStyles } from '../themes/global'
import ROUTES from '../navigations/Routes'
import { TripModel } from '../types/TripModel'
import { TripService } from '../services/tripService'
import { RootState } from '../store'
import { useSelector } from 'react-redux'

const HEIGHT = Dimensions.get('window').height


const PlanListScreen = ({ navigation }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [plans, setPlans] = useState<TripModel[]>([])
  
  useEffect(() => {
    const tripService = new TripService()
    tripService.getTripsByUserId(user._id).then(res => {
      setPlans(res.data.data ?? [])
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(ROUTES.PlanDetail, {item})}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.startDate?.toLocaleDate() ?? "Tarih Seçilmedi"} - {item.endDate?.toLocaleDate() ?? "Tarih seçilmedi"}</Text>
      </View>
    </TouchableOpacity>
  );

  const activePlans = plans.filter(x => new Date(x.endDate ?? "") > new Date())
  const completePlans = plans.filter(x => new Date(x.endDate ?? "") < new Date())

  return (
    <View>
      <StatusBar translucent backgroundColor={"transparent"} />
      <ScrollView>
        <ImageBackground source={require("../assets/static/discover-0.jpg")} style={styles.topImage}>
          <LinearGradient colors={['#ffffff00', '#000000ff']} start={{ x: 0, y: 0.7 }} end={{ x: 0, y: 1 }} style={{ flex: 1, borderRadius: 10, justifyContent: "flex-end" }}>
            <Text style={{ fontFamily: "AlongSansExtraBold", color: "#fff", fontSize: 30, padding: 10 }}>Gezilerim 🚀</Text>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.content}>
          <Button onPress={() => navigation.navigate(ROUTES.Planning)}>Yeni Gezi Planı Oluştur</Button>
          <View style={{ marginVertical: 30 }}>
            <Text style={[GlobalStyles.textTitle, { fontFamily: "AlongSansExtraBold", color: "#555", marginBottom: 10 }]}>Aktif Gezilerim 🎗</Text>
            {activePlans.length > 0 ? (
              <List data={activePlans} ItemSeparatorComponent={Divider} renderItem={renderItem} />
            ) : (
              <Text style={{fontWeight: "bold"}}>Aktif planınız bulunmamaktadır. Yukarıdan yeni bir tane ekleyin 🚀.</Text>
            )}
          </View>
          <View style={{ marginVertical: 30 }}>
            <Text style={[GlobalStyles.textTitle, { fontFamily: "AlongSansExtraBold", color: "#555", marginBottom: 10 }]}>Sonlanmış Gezilerim ✔</Text>
            <List data={completePlans} ItemSeparatorComponent={Divider} renderItem={renderItem} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default PlanListScreen

const styles = StyleSheet.create({
  topImage: {
    height: HEIGHT * 0.3,
  },
  content: {
    padding: 10,
  },
  card: {
    marginVertical: 20,
    borderRadius: 10,
  },
  cardHeader: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
})