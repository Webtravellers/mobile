import React from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import LocationCard from '../../components/LocationCard'
import { RootState } from '../../store'
import Icon from 'react-native-vector-icons/AntDesign';

const LocationListScreen: React.FC<any> = ({ navigation }) => {
    const { filteredLocations } = useSelector((state: RootState) => state.locations)
    if (!filteredLocations) {
        return <ActivityIndicator size="large" color="#0000ff" />
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.safeArea}>
                    <TouchableOpacity activeOpacity={0.5} style={{ width: 50 }} onPress={() => navigation.goBack()}>
                        <Icon name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                {filteredLocations.map((location, index) => (
                    <LocationCard key={index} card={location} css={styles} navigation={navigation} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        padding: 10,
    },
    image: {
        width: '100%',
        height: 300
    }
})

export default LocationListScreen