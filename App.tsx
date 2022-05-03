import React, { useState } from 'react';
import './src/assets/languages/i18n'
import { useTranslation } from 'react-i18next';
import { Button, StyleSheet, Text, View } from 'react-native';

export type Props = {};

const Hello: React.FC<Props> = () => {
    const { t, i18n } = useTranslation();

    const [currentLanguage, setLanguage] = useState('en');

    const changeLanguage = (value: string): void => {
        console.log(value)
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>
                {t('hello')}
            </Text>
            <View>
                <Button
                    title="Türkçeasd"
                    accessibilityLabel="increment"
                    onPress={() => changeLanguage("tr")}
                    color="blue"
                />
                <Button
                    title="English"
                    accessibilityLabel="decrement"
                    onPress={() => changeLanguage("en")}
                    color="red"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 16
    }
});

export default Hello;