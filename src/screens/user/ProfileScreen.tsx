import { Block, Text } from 'galio-framework';
import React from 'react';
import { Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import StorageService from '../../services/StorageService';
import { RootState } from '../../store';

const { height, width } = Dimensions.get("screen");
const ProfileScreen = () => {
    const { user } = useSelector((state: RootState) => state.user);

    return (
        <SafeAreaView>
            <ImageBackground
                source={{ uri: user.wallpaper }}
                style={styles.userWallpaper}
            >
                <View style={styles.userImage}>
                    <Image
                        source={{ uri: user.photo }}
                        borderRadius={100}
                        style={{
                            width: 120,
                            height: 120,
                            borderColor: "white",
                            borderWidth: 3
                        }}
                    />
                </View>
                {/* <TouchableOpacity style={{width: 50}}>
                    <Icon name="setting" size={30} color="white" />
                </TouchableOpacity> */}
            </ImageBackground>
            <Block center>
                <Text h3 color='black'>{user.fullname}</Text>
                <Block row style={styles.followStat}>
                    <TouchableOpacity>
                        <Block center>
                            <Text h4>{user.followers.length}</Text>
                            <Text muted>Takipçi</Text>
                        </Block>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Block center>
                            <Text h4>{user.following.length}</Text>
                            <Text muted>Takip</Text>
                        </Block>
                    </TouchableOpacity>
                </Block>
                <Block width={200}>
                    <Text muted>
                        Biyografi 🎉🙌
                    </Text>
                </Block>
            </Block>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    userWallpaper: {
        width: width,
        height: height * 0.3,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        marginBottom: 40
    },
    userImage: {
        flexDirection: "row",
        justifyContent: "center",
        transform: [{ translateY: 30 }],
    },
    followStat: {
        marginVertical: 10,
        paddingBottom: 20,
        justifyContent: "space-between",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        width: 200,
        paddingHorizontal: 20
    }
})

export default ProfileScreen