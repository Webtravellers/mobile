import { AxiosResponse } from "axios";
import api from "./api";

const endpoint = "locations/"

export class LocationService {
    public async getAll(): Promise<AxiosResponse<any, any>> {
        return api().get(endpoint);
    }
}