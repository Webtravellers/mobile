import { LocationFilter } from './../types/locationFilterModel';
import { AxiosResponse } from "axios";
import api from "./api";

const endpoint = "locations/"

export class LocationService {
    public async getAll(filter:LocationFilter={}): Promise<AxiosResponse<any, any>> {
        filter = {page: 1, size: 20, city: "", type: "", ...filter};
        return api().get(endpoint+`?page=${filter.page}&size=${filter.size}&city=${filter.city}&types=${filter.type}`);
    }

    public async getAllTypes(): Promise<AxiosResponse<any, any>> {
        return api().get("location-types/");
    }

    public async filter(data:LocationFilter): Promise<AxiosResponse<any, any>> {
        return api().post(endpoint + "filter/", data);
    }

    public async getComments(id:number): Promise<AxiosResponse<any, any>> {
        return api().get(endpoint + id + "/comments/");
    }
    
    public async newComment(id:number, data): Promise<AxiosResponse<any, any>> {
        return api().post(endpoint + id + "/comments/", data);
    }
}