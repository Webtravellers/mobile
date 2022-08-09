import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { GlobalStyles } from '../../themes/global'
import BiInput from '../../components/BiInput'
import { Button } from '@ui-kitten/components'
import * as ImagePicker from 'react-native-image-picker'
import { PostService } from '../../services/postService'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchPostByUserId } from '../../store/user'
import ROUTES from '../../navigations/Routes'
const postService = new PostService()

const NewPostScreen = ({navigation}) => {
    const {user} = useSelector((state:RootState) => state.user)
    const [pickerResponse, setPickerResponse] = useState<ImagePicker.ImagePickerResponse | null>(null)
    const [caption, setCaption] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const dispatch = useDispatch()

    const onImageLibraryPress = useCallback(() => {
        const options: ImagePicker.ImageLibraryOptions = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        };
        ImagePicker.launchImageLibrary(options, setPickerResponse);
    }, []);

    const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

    const handleShareClick = () => {
        if(!uri || !pickerResponse || !caption) return;
        setLoading(true)
        const formData = new FormData();
        
        formData.append("photo", {uri: pickerResponse.assets[0].uri, name: pickerResponse.assets[0].fileName, type: pickerResponse.assets[0].type});
        formData.append("caption", caption)
        console.log(formData)
        postService.newPost(user?._id, formData)
            .then(res => {
                console.log(res.data)
                dispatch(fetchPostByUserId(user?._id))
                navigation.navigate(ROUTES.Profile)
            })
            .catch(err => {
                console.log(err.response)
            })
            .finally(() => {
                setCaption("");
                setLoading(false)
            })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.root}>
                <TouchableOpacity>
                    <Text style={styles.text}>Yeni Gönderi Oluştur</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button appearance={"ghost"} status="success" onPress={handleShareClick}>
                        {loading ? <ActivityIndicator size={"large"} /> : "Paylaş"}
                    </Button>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                    <Text style={[GlobalStyles.textHeader, { fontSize: 24 }]}>Ön Yazı</Text>
                    <BiInput placeholder='Ön yazı' multiline style={{ backgroundColor: "#fcf8f5" }} onChangeText={setCaption}/>
                </View>
                <View style={styles.photoWrapper}>
                    <Image source={{uri: uri}} style={{height: uri ? 500 : 0, width: 300, resizeMode: "contain"}}/>
                    <Button onPress={onImageLibraryPress}>Fotoğraf Seç</Button>
                </View>
            </ScrollView>
        </View>
    )
}

export default NewPostScreen

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#e6e6e6",
        elevation: 1
    },
    text: {
        fontFamily: 'AlongSansExtraBold',
        fontSize: 20,
    },
    photoWrapper: {
        flex: 1,
        marginVertical: 20,
        alignItems: "center"
    }
})