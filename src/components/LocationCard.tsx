import { Block, Text } from 'galio-framework';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Location from '../types/LocationModel';

export type LocationCardProps = {
    card: Location,
    navigation: any,
    css?: any
}

const LocationCard:React.FC<LocationCardProps> = ({card, navigation, css}) => {

    return (
    <Block style={{margin: 10}}>
      <TouchableOpacity activeOpacity={0.75} style={{borderRadius: 10}} onPress={() => navigation.navigate("LocationDetail", {...card})}>
        <ImageBackground
          source={{uri: card?.photos[0] ?? "https://cdn.otelleri.net/landing/ankara/gezi-rehberi/anitkabir-2095-f6.jpg"}}
          style={{...styles.image, ...css?.image}}
          borderRadius={10}
        >
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Block flex row>
                {/* <Text style={styles.star}>  
                  <Icon size={15} name='staro' />
                  {" "}{card?.rate ?? 5.0}
                </Text> */}
            </Block>
            {/* <Block>
              <Text style={styles.star}>
                <Icon size={15} name='hearto' />
              </Text>
            </Block> */}
          </View>
        </ImageBackground>
        
        <View>
            <Text bold>{card?.name ?? ""}</Text>
            <Text muted>{card?.city.cityName ?? ""}</Text>
          </View>
      </TouchableOpacity>
    </Block>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 140,
    borderRadius: 20,
  },
  star: {
    backgroundColor: "rgba(89, 89, 89, 0.6)",
    borderRadius: 10,
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 2
  },
})

export default LocationCard