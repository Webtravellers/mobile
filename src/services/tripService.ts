import { TripModel } from './../types/TripModel';
import { AxiosResponse } from "axios";
import { SigninModel } from "../types/SigninModel";
import api from "./api";

const endpoint = "trips/"

export class TripService {
    public async newTrip(user:string, data:any): Promise<AxiosResponse<any, any>> {
        return api().post(endpoint + user, data);
    }

    public async getTripsByUserId(user:string): Promise<AxiosResponse<any, any>> {
        return api().get(endpoint + user);
    }
    
    public async getTripById(user:string, id:string): Promise<AxiosResponse<any, any>> {
        return api().get(endpoint + user + "/" + id);
    }

    public async addLocationToTrip(user:string, id:string, data:any): Promise<AxiosResponse<any, any>> {
        return api().post(endpoint + user + "/" + id +"/locations", data);
    }

    public async removeLocationFromTrip(user:string, id:string, locationId:string): Promise<AxiosResponse<any, any>> {
        return api().delete(endpoint + user + "/" + id +"/locations/"+ locationId);
    }
}