import { useDispatch } from 'react-redux';
import React from "react";
import { ErrorAlert } from "../components/Alert";
import StorageService, { StorageKeys } from "../services/StorageService";
import { SigninModel } from "../types/SigninModel";
import { UserModel } from "../types/userModel";
import { AuthService } from '../services/authService';
import { setUser as SetStoreUser } from '../store/user';

const useAuth = () => {
    const [user, setUser] = React.useState<UserModel | null>(null);

    const dispatch = useDispatch()

    React.useEffect(() => {        
        StorageService.get(StorageKeys.USER).then(res => {
            if(res == null && user != null) {
                setUser(null);
            } else {
                const user: UserModel = JSON.parse(res+"")
                setUser(user);
            }
        })
    }, []);

    const login = (values:SigninModel) => {
        const authService = new AuthService()
        authService.signin(values).then(res => {
        
            const user: UserModel = {...res.data?.data.user}
            user.token = res.data?.data.token
            dispatch(SetStoreUser(user))

            StorageService.set(StorageKeys.USER, user).then(res => {
                // navigation.navigate(ROUTES.Discover)
            }).catch(err => console.log(err))
        
        }).catch(err => {
            ErrorAlert({
                text: err.response?.data?.message ?? "Sunucu ile bağlantı sağlanamadı, lütfen daha sonra tekrar deneyiniz.",
            })
        })
        setUser(user);
    }

    const logout = () => {
        StorageService.remove(StorageKeys.USER).then(() => {
            dispatch(SetStoreUser(null))
        })
    }

    return { user, login, logout };
}

export default useAuth