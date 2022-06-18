# Bi'Hatira
Travel Mobil App


# Proje Geliştirme Platformu
Visual Studio Code
Android Studio - Bumblebee  2021.1.1 Patch 3


# Kullanılan Dil
JavaScript, TypeScript, Java


# Versiyon
Android
- min SDK Version = 21
- Compile SDK Version = 31
- Target SDK Version = 31

React Native
- Version: 0.68.1
- TypeScript: 4.6.4
- ESLint: 7.32.0

 
# Api
Api32


# Emulator
Pixel 2 Api32


# Fiziksel Cihaz
Huawei Y9 2019 (API 28)


# Uygulamayı Çalıştırmak
__BiHatira.apk__

Demo kullanıcı bilgileri:

Eposta: demo@gmail.com

Şifre: 1


# React Native Projesini Çalıştırmak

Bilgisayarda Node.js, npm, openjdk11, Android Studio ve Android API32 yüklü olması gerekmektedir.

bihatira klasörü içerisinde;

```
npm install
```

Dependency paketler yüklendi. Daha sonra Andorid Emulatorü çalıştıralım veya fiziksel makineyi bilgisayara bağlayalım.

```
adb devices
```

komutu ile cihaz kontrolü sağlayalım. 
Eğer görünmüyorsa: https://reactnative.dev/docs/environment-setup

Daha sonra uygulamayı başlatmak için Android cihaza build almamız gerekmekte.

```
npm run android
```

Build bir kere alınır. Yaklaşık 2-5 dakika arası sürmektedir.

Buildden sonra şu komut ile birkaç saniyede uygulama çalıştırılır.
```
npm run start
```