import { LocationFilter } from './../types/locationFilterModel';
import { AxiosResponse } from "axios";
import api from "./api";

const endpoint = "locations/"

export class LocationService {
    public async getAll(): Promise<AxiosResponse<any, any>> {
        return api().get(endpoint);
    }

    public async getAllTypes(): Promise<AxiosResponse<any, any>> {
        return api().get("location-types/");
    }

    public async filter(data:LocationFilter): Promise<AxiosResponse<any, any>> {
        return api().post(endpoint + "filter/", data);
    }
}