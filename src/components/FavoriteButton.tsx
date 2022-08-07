import { ActivityIndicator, Alert, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { UserService } from '../services/userService'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { setFavoriteList } from '../store/user'
import { useDispatch } from 'react-redux'

const userService = new UserService()
const FavoriteButton = ({location, style={}}) => {
    const { user, favoriteList } = useSelector((state: RootState) => state.user);
    const [isFavorite, setIsFavorite] = React.useState<boolean>(false)
    const dispatch = useDispatch()

    const handleFavoriteClick = () => {
        setIsFavorite(true)
        userService.toggleLocationFavorite(user?._id ?? "", location._id).then(res => {
            const favoritesList = res.data.data.favoritesList
            dispatch(setFavoriteList(favoritesList))
            setIsFavorite(false)
            ToastAndroid.showWithGravityAndOffset(res.data.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 100)
        }
        )
    }

    return (
        <TouchableOpacity disabled={favoriteList == null} activeOpacity={0.5} style={[styles.btn, style]} onPress={handleFavoriteClick}>
            {isFavorite ? <ActivityIndicator size={30} /> : (
                <IonIcon name={favoriteList?.some(x => x._id == location._id) ? "heart" : "heart-outline"} size={30} color="#ff0c33" />
            )}
        </TouchableOpacity>
    )
}

export default FavoriteButton

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#F9B15B",
        padding: 10,
        elevation: 5,
        borderRadius: 10,
    },
})