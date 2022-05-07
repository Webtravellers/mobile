import { AxiosResponse } from "axios";
import { SigninModel } from "../types/SigninModel";
import { SignupModel } from "../types/SignupModel";
import api from "./api";

export class AuthService {
    public async signup(data:SignupModel): Promise<AxiosResponse<any, any>> {
        return api().post("users/signup", data);
    }

    public async signin(data:SigninModel): Promise<AxiosResponse<any, any>> {
        return api().post("users/signin", data);
    }
}