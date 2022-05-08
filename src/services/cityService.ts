import { AxiosResponse } from "axios";
import api from "./api";

const endpoint = "cities/"

export class CityService {
    public async getAll(): Promise<AxiosResponse<any, any>> {
        return api().get(endpoint);
    }
}