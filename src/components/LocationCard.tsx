import { Block, Text } from 'galio-framework';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Location from '../types/Location';

export type LocationCardProps = {
    card: Location,
    navigation: any,
}

const LocationCard:React.FC<LocationCardProps> = ({card, navigation}) => {

    return (
    <Block style={{margin: 10}}>
      <TouchableOpacity activeOpacity={0.75} style={{borderRadius: 10}} onPress={() => navigation.navigate("LocationDetail", {...card})}>
        <ImageBackground
          source={{uri: card?.image}}
          style={styles.image}
          borderRadius={10}
        >
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Block flex row>
                <Text style={styles.star}>  
                  <Icon size={15} name='staro' />
                  {" "}{card?.rate ?? 5.0}
                </Text>
            </Block>
            <Block>
              <Text style={styles.star}>
                <Icon size={15} name='hearto' />
              </Text>
            </Block>
          </View>
        </ImageBackground>
        
        <View>
            <Text bold>{card?.title ?? ""}</Text>
            <Text muted>{card?.subTitle ?? ""}</Text>
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