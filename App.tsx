import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import './src/assets/languages/i18n';
import Navigator from './src/navigations/Navigator';
import StorageService, { StorageKeys } from './src/services/StorageService';
import { store } from './src/store';
import { setUser } from './src/store/user';
import { UserModel } from './src/types/userModel';

const App: React.FC<any> = () => {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
};

export default App;