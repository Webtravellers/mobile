import { AxiosResponse } from "axios"
import api from "./api"

const endpoint = "posts/"
export class PostService {

    public getPostsByUserId(userId:string): Promise<AxiosResponse<any, any>> {
        return api().get(endpoint + "getbyuser/" + userId)
    }
}