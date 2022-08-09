import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Button, Input } from '@ui-kitten/components'
import IOIcon from 'react-native-vector-icons/Ionicons'
import BiInput from '../../components/BiInput'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import * as ImagePicker from 'react-native-image-picker'
import { UserService } from '../../services/userService'
import ROUTES from '../../navigations/Routes'
import { useDispatch } from 'react-redux'
import { fetchUserById } from '../../store/user'

const userService = new UserService()
const UpdateProfileScreen = ({navigation}) => {
    const { user } = useSelector((state: RootState) => state.user)
    const [name, setName] = useState(user?.name ?? "")
    const [lastname, setLastname] = useState(user?.lastname ?? "")
    const [photo, setPhoto] = useState<ImagePicker.ImagePickerResponse | null>(null)
    const [wallpaper, setWallpaper] = useState<ImagePicker.ImagePickerResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    
    const dispatch = useDispatch()
    const onImageLibraryPress = useCallback((callback) => {
        const options: ImagePicker.ImageLibraryOptions = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        };
        ImagePicker.launchImageLibrary(options, callback);
    }, []);

    const photoUri = photo?.assets && photo.assets[0].uri;
    const wallpaperUri = wallpaper?.assets && wallpaper.assets[0].uri;

    console.log(user)
    const handleSaveClick = () => {
        if(loading) return;
        setLoading(true)
        // if (!photoUri || !wallpaperUri) return;
        const formData = new FormData();
        photoUri && formData.append("photo", { uri: photoUri, name: photo.assets[0].fileName, type: photo.assets[0].type });
        wallpaperUri && formData.append("wallpaper", { uri: wallpaperUri, name: wallpaper.assets[0].fileName, type: wallpaper.assets[0].type });
        formData.append("name", name);
        formData.append("lastname", lastname);
        console.log(formData)
        userService.updateProfile(user?._id??"", formData)
            .then(res => {
                dispatch(fetchUserById(user?._id ?? ""))
                navigation.navigate(ROUTES.Profile)
            })
            .catch(err => {
                console.log(err.response)
            }).finally(() => {
                setLoading(false)
            })
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.root}>
                <TouchableOpacity>
                    <Text style={styles.text}>Profili Düzenle</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <IOIcon name="close" size={24} color="red" />
                </TouchableOpacity>
            </View>
            <ScrollView >
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <Input label={"Adın"} placeholder="Ad" style={styles.input} value={name} onChangeText={setName} />
                    <Input label={"Soyadın"} placeholder="Soyad" style={styles.input} value={lastname} onChangeText={setLastname} />
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.row}>
                            <Text>Fotoğrafın: </Text>
                            <Button status={"basic"} appearance="ghost" onPress={() => onImageLibraryPress(setPhoto)}>Değiştir</Button>
                        </View>
                        <Image source={{ uri: photoUri ?? user?.photo }} style={styles.image} />
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.row}>
                            <Text>Arka Kapak Fotoğrafın: </Text>
                            <Button status={"basic"} appearance="ghost" onPress={() => onImageLibraryPress(setWallpaper)}>Değiştir</Button>
                        </View>
                        <Image source={{ uri: wallpaperUri ?? user?.wallpaper ?? "https://wallpaperaccess.com/full/2135329.jpg" }} style={styles.image} />
                    </View>
                </View>
            </ScrollView>
            <Button onPress={handleSaveClick} disabled={loading}>
                {loading ? <ActivityIndicator size="small" color="white" /> : "Kaydet"}
            </Button>
        </View>
    )
}

export default UpdateProfileScreen

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#e6e6e6",
        elevation: 1
    },
    text: {
        fontFamily: 'AlongSansExtraBold',
        fontSize: 20,
    },
    input: {
        marginVertical: 10,
    },
    image: {
        width: "100%",
        height: 200,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})