import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import './src/assets/languages/i18n';
import Navigator from './src/navigations/Navigator';
import StorageService, { StorageKeys } from './src/services/StorageService';
import { store } from './src/store';
import { setUser } from './src/store/user';
import { UserModel } from './src/types/userModel';

import * as eva from '@eva-design/eva'
import { myTheme } from './src/themes/custom-theme';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: React.FC<any> = () => {
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <Provider store={store}>
                <ApplicationProvider {...eva} theme={{ ...eva.light, ...myTheme }}>
                    <SafeAreaProvider>
                        <Navigator />
                    </SafeAreaProvider>
                </ApplicationProvider>
            </Provider>
        </>
    );
};

export default App;