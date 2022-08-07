import { AxiosResponse } from "axios";
import api from "./api";

const endpoint = "users/"
export class UserService {

    public getUser(userId: string): Promise<AxiosResponse<any, any>> {
        return api().get(endpoint + userId)
    }

    public toggleLocationFavorite(userId: string, locationId: string): Promise<AxiosResponse<any, any>> {
        return api().post(endpoint + `${userId}/favorites/${locationId}`);
    } 
}