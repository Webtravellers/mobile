import { Text } from 'galio-framework'
import React from 'react'
import { Button, Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import Location from '../types/Location';

const historyLocations = [
    {
        image: "https://cdn.otelleri.net/landing/ankara/gezi-rehberi/anitkabir-2095-f6.jpg",
        title: "Anıtkabir",
        subTitle: "Ankara",
        rate: 5.0,
        description: `Anıtkabir, Türkiye'nin başkenti Ankara'nın Çankaya ilçesinde yer alan Mustafa Kemal Atatürk'ün anıt mezarını içeren komplekstir. Emin Onat ile Orhan Arda'nın tasarımı olan yapı kompleksinin 1944'te başlanan inşası 1953'te tamamlanmıştır.`
    },
    {
        image: "https://www.hediyesepeti.com/blog/wp-content/uploads/2020/01/tarihi-yerler.jpg",
        title: "Efes Antif Kenti",
        subTitle: "İzmir",
        rate: 4.7,
        description: `Efes, Anadolu'nun batı kıyısında, bugünkü İzmir ilinin Selçuk ilçesinin üç kilometre güneybatısındaki İyonya kıyısında ve sonraları önemli bir Roma kenti olan antik bir Yunan kentiydi. Kuruluşu Cilalı Taş Devri MÖ 6000 yıllarına dayanır.`
    },
    {
        image: "https://www.hediyesepeti.com/blog/wp-content/uploads/2020/01/antalyanin-tarihi-yerleri.jpg",
        title: "Aspendos",
        subTitle: "Antalya",
        rate: 4.3,
        description: `Aspendos veya Belkıs Antalya ili Serik ilçesinde bulunan Belkıs köyünde yer alan antik tiyatrosuyla meşhur bir antik kenttir. Pamfilya'nın en zengin şehirlerinden birisidir.`
    },
    {
        image: "https://www.hediyesepeti.com/blog/wp-content/uploads/2020/01/batman-tarihi-yerler.jpg",
        title: "Hasankeyf",
        subTitle: "Batman",
        rate: 4.8,
        description: `Hasankeyf, Batman ilinin ilçesidir. İki yakasını Dicle'nin ayırdığı, tarihi bir ilçedir. İlçenin tarihi, 12.000 yıl öncesine kadar gitmektedir. 1981'de doğal koruma alanı ilan edilmiştir. Ilısu Barajının su tutması sonucunda tarihi yerleşim 2020 yılı Mayıs ayında sular altında kalmıştır.`
    },
    {
        image: "https://www.hediyesepeti.com/blog/wp-content/uploads/2020/01/istanbul-tarihi-yerler.jpg",
        title: "Ayasofya",
        subTitle: "İstanbul",
        rate: 4.9,
        description: `Ayasofya-i Kebîr Câmi-i Şerîfi, eski ismiyle Ayasofya Kilisesi veya Ayasofya Müzesi, İstanbul'da yer alan bir cami, eski bazilika, katedral ve müze. Bizans İmparatoru I. Justinianus tarafından, 532-537 yılları arasında İstanbul'un tarihî yarımadasındaki eski şehir merkezine inşa ettirilmiş bazilika planlı bir patrik katedrali olup 1453 yılında İstanbul'un Osmanlılar tarafından fethedilmesinden sonra II. Mehmed tarafından camiye dönüştürülmüştür. Mustafa Kemal Atatürk tarafından 1934 yılında yayımlanan Bakanlar Kurulu Kararnamesi ile müzeye dönüştürülmüş, kazı ve tadilat çalışmaları başlatılmış ve 1935-2020 yılları arasında her inanç grubundan insanlar için müze olarak hizmet vermiştir. 2020 yılında ise müze statüsü iptal edilerek cami statüsü verilmiştir.`
    }
]

const { width } = Dimensions.get("screen")

const HomePage:React.FC<any> = ({ navigation }) => {
    const carouselRef = React.useRef(null);
    return (
        <SafeAreaView>
            <ImageBackground source={{ uri: "https://cdn.goturkiye.com/goturkey/eastern-camping-goturkey.jpg" }} style={styles.topImage}>

                <View style={styles.root}>
                </View>
            </ImageBackground>
            <View>
                <Carousel
                    ref={carouselRef}
                    data={historyLocations}
                    renderItem={CarouselItem}
                    sliderWidth={400}
                    itemWidth={width * 0.9}
                />
            </View>
        </SafeAreaView>
    )
}
type CarouselItemProps = {
  item: Location
}
const CarouselItem:React.FC<CarouselItemProps> = ({ item }) => {
    return (
        <View style={styles.slide}>
            <Image source={{ uri: item?.image }} style={styles.carouselItemImage} />
            <Text bold h6>{item.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingTop: 40,
        paddingBottom: 15,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    topImage: {
        width: width,
        height: 500
    },
    slide: {
        backgroundColor: "white",
        height: 200,
    },
    carouselItemImage: {
        height: 200,
        width: width * 0.9
    }
})
export default HomePage