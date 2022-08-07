import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LocationService } from '../services/locationService'
import Location from '../types/LocationModel'

const locationService = new LocationService()
const LocationInfinityList = ({ RenderLocationItem, filter = {} }) => {
    const [locations, setLocations] = useState<Location[]>([])
    const [page, setPage] = useState(0)
    const [totalPageSize, setTotalPageSize] = useState<number>(Infinity)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        locationService.getAll({ page: 1, size: 10, ...filter }).then(res => {
            const locations = res.data.data as Location[]
            setLocations([...locations])
            setPage(page + 1)
            setTotalPageSize(res.data.totalPageSize)
            setLoading(false)
        })
    }, [filter])

    const getMoreLocations = () => {
        if (page >= Math.ceil(totalPageSize / 10)) return;
        setLoading(true)
        locationService.getAll({ page: page + 1, size: 10, ...filter }).then(res => {
            const s = res.data.data as Location[]
            setLocations([...locations, ...s])
            setPage(page + 1)
            setLoading(false)
        }
        )
    }
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
        <FlatList
            data={locations}
            renderItem={({ item }) => <RenderLocationItem item={item} />}
            keyExtractor={item => item._id}
            onEndReached={getMoreLocations}
            ListFooterComponent={indicator}
        />
    )
}

export default LocationInfinityList

const styles = StyleSheet.create({})