import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKeys {
    TOKEN = "token",
    USER = "user",
}

class StorageService {
    public async set(key: string, value:any): Promise<void> {
        let data = value
        if(typeof value !== "string") {
            data = JSON.stringify(value)
        }
        await AsyncStorage.setItem(key, data);
    }
    
    public async get(key: string): Promise<string | null> {
        return await AsyncStorage.getItem(key);
    }

    public async remove(key: string): Promise<void> {
        await AsyncStorage.removeItem(key);
    }

    public async clear(): Promise<void> {
        await AsyncStorage.clear();
    }

    public async has(key: string): Promise<boolean> {
        return await AsyncStorage.getItem(key) !== null;
    }
}

export default new StorageService();