import { Block, Text } from 'galio-framework'
import React from 'react'
import { Dimensions, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import LocationCard from '../components/LocationCard'


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

const delicacies = [
    {
        image: "https://cdn.yemek.com/uploads/2016/03/tirit-tarifi.jpg",
        title: "Tirit",
        rate: 5.0,
        description: `Tirit et suyuna kızartılmış veya bayat ekmek konularak yapılan yemektir. Tirit kelimesi Farsça bir kelimedir. Yörelere göre çok farklı et çeşitleri konulabilir. Kaz, ördek, tavuk, inek, koyun eti ile yapılan çeşitleri vardır. Papara ve Orta Asya'da yapılan Beşbarmak yemeği ile benzerlik gösterir.`
    },
    {
        image: "https://cdn.yemek.com/mnresize/940/940/uploads/2017/12/sogan-pidesi-tarifi.jpg",
        title: "Soğan pidesi",
        rate: 4.7,
        description: ``
    },
    {
        image: "https://cdn.yemek.com/uploads/2017/03/nokul-tarifi.jpg",
        title: "Nokul",
        rate: 4.3,
        description: `Nokul mayalı hamurla yapılan bir çeşit poğaça. Türkiye'de lokum, lokul gibi farklı isimlerle adlandırılan hamur işidir.Rulo şeklinde yapılması en ayırt edici özelliğidir. Haşhaşlı, tahinli fındıklı, sakızlı türleri de mevcuttur. Bayram sofralarının vazgeçilmezlerindendir. `
    },
    {
        image: "https://cdn.yemek.com/uploads/2015/09/kerebic-tarifi.jpg",
        title: "Kerbiç",
        rate: 4.4,
        description: `Kerebiç anlamı nedir?
        Kerebiç; Mersin yöresine ait, bayramlarda çokça tüketilen bir tatlıdır. Kerebiç beyaz bir kaymağın içinde yatan, içi fıstık ya da cevizle dolu, irmikten yapılmış, içli köfteye benzeyen bir tatlıdır. Beyaz kaymak olmaksızın da yenen bu tatlıya Ma'amoul denilir.`
    },
    {
        image: "https://cdn.yemek.com/uploads/2018/04/hashasli-lokum-tarifi-.jpg",
        title: "Haşhaşlı",
        rate: 4.9,
        description: ``
    }
]

const naturalLocations = [
    {
        image: "https://www.hediyesepeti.com/blog/wp-content/uploads/2020/01/mersin-tarihi-yerler.jpg",
        title: "Kız Kalesi",
        subTitle: "Mersin",
        rate: 4.9,
        description: `Kızkalesi, Mersin ili Erdemli ilçesine bağlı bir mahalledir. Yerleşime adını veren tarihi Kız Kalesi mahalle sınırları içerisindedir.`
    },
    {
        image: "https://www.hediyesepeti.com/blog/wp-content/uploads/2020/01/urfa-tarihi-yerler.jpg",
        title: "Balıklı Göl",
        subTitle: "Şanlıurfa",
        rate: 4.8,
        description: `İbrahim'e düşmanlık besleyen Nemrut, Hz. İbrahim'i küçük bir tepenin üzerine kurduğu mancınıklara (sütunlara) gerdiği halat ile tepenin aşağısında yanan ateşe fırlatır. Hz. İbrahim'in atıldığı yerdeki ateşin göle, ateşte yanan odunlarınsa balıklara dönüştüğüne inanılır.`
    },
    {
        image: "https://www.hediyesepeti.com/blog/wp-content/uploads/2020/01/trabzon-tarihi-yerler.jpg",
        title: "Sümela Manastırı",
        subTitle: "Trabzon",
        rate: 4.3,
        description: `Sümela Manastırı, Trabzon ilinin Maçka ilçesindeki Altındere vadisi sınırları içerisinde yer alan Meryem Ana Deresi'nin batı yamaçlarında yer alan, Kara tepesinin üzerinde ve deniz seviyesinden 1.150 m yükseklikte konumlanmış Rum Ortodoks manastır ve kilise kompleksidir.`
    },
    {
        image: "https://i3.posta.com.tr/i/posta/75//0x410/6207602745d2a0c0140ee1ac.jpg",
        title: "Kapadokya",
        subTitle: "Nevşehir",
        rate: 4.1,
        description: `Kapadokya, 60 milyon yıl önce Erciyes, Hasandağı ve Göllüdağ’ın püskürttüğü lav ve küllerin oluşturduğu yumuşak tabakaların milyonlarca yıl boyunca yağmur ve rüzgâr tarafından aşındırılmasıyla ortaya çıkan bölgedir.`
    },
    {
        image: "https://cdn1.neredekal.com/resimler/haber/image/sehriban-kanyonu-gezilmesigerekenyerler-1-jpg.jpeg",
        title: "Şehriban Kanyonu",
        subTitle: "Kastamonu",
        rate: 4.6,
        description: `Kastamonu'nun Şenpazar ilçesinde bulunan eşsiz bir doğa harikasıdır. Dik yamaçları ile meşhur kanyon zaman zaman bir metreye kadar birbirine yaklaşmaktadır. 1997 yılında ilk kez Atlas ekibi tarafından geçilen kanyon hala gizemini koruyan ender yerlerdendir. Bin metre yüksekliğe kadar ulaşan birbirine neredeyse değecek kadar yakın duvarları arasından uzunca bir hat boyu bir çay vardır ve çayın döküldüğü yerde insan gücünün baş edemeyeceği kadar güçlü bir akıma sahiptir. Belki de bu nedenledir Şehriban kanyonuna “ölümle dans kanyonu” adı verilemesi. Bu çay Küre dağlarını ikinci kez bölme özelliğine sahiptir. Karadeniz ikliminin görüldüğü kanyonda yaz yağışları sebebi ile her mevsim debisi yüksek bir su taşıma potansiyeline sahiptir.`
    }
]

const { width, height } = Dimensions.get("screen")

const DiscoverScreen:React.FC<any> = ({ navigation }) => {

    const navElements = [
        {
            text: "Popüler",
            active: true,
        },
        {
            text: "Önerilenler",
        },
        {
            text: "Eğlence",
        },
        {
            text: "Kültürel",
        },
        {
            text: "Unutulan Lezzetler",
        }
    ]

    return (
        <Block>
            <ScrollView>
                <ImageBackground source={{ uri: "https://cdn.goturkiye.com/goturkey/eastern-camping-goturkey.jpg" }} style={styles.topImage}>
                    <Block center style={{ marginVertical: 30 }}>
                        <Text h3 bold>Dijital Asistan</Text>
                    </Block>
                </ImageBackground>
                <View style={styles.topNav}>
                    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} horizontal style={{ flexGrow: 1 }}>
                        {navElements.map(nav => (
                            <View style={styles.tab}>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text h6>{nav.text}</Text>
                                    <Block center style={nav.active ? styles.activeTab : {}} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.root}>
                    <View style={styles.locationList}>
                        <Text h4 bold>Tarihi Mekanlar</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} horizontal style={{ flexGrow: 1 }}>
                            {historyLocations.map(location => (
                                <LocationCard card={location} navigation={navigation} />
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.locationList}>
                        <Text h4 bold>Unutulmuş Lezzetler</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} horizontal style={{ flexGrow: 1 }}>
                            {delicacies.map(delicacy => (
                                <LocationCard card={delicacy} navigation={navigation} />
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.locationList}>
                        <Text h4 bold>Doğal Güzellikler</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} horizontal style={{ flexGrow: 1 }}>
                            {naturalLocations.map(location => (
                                <LocationCard card={location} navigation={navigation} />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </Block>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 20,
    },
    topImage: {
        width: width,
        height: 200,
        opacity: 0.8,
        justifyContent: "space-around"
    },
    topNav: {
        padding: 20,
    },
    tab: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    activeTab: {
        borderStyle: "solid",
        borderColor: "red",
        borderBottomWidth: 3,
        width: "50%",
        marginTop: 5,
    },
    locationList: {
        marginVertical: 20,
    }
})

export default DiscoverScreen