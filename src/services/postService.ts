import { AxiosResponse } from "axios"
import api from "./api"

const endpoint = "posts/"
export class PostService {

    public getPostsByUserId(userId:string): Promise<AxiosResponse<any, any>> {
        return api().get(endpoint + "getbyuser/" + userId)
    }

    public handleLikeEvent(userId, postId): Promise<AxiosResponse<any, any>> {
        return api().post(endpoint + postId + "/likes/" + userId, {})
    }

    public getPostComments(postId): Promise<AxiosResponse<any, any>> {
        return api().get(endpoint + postId + "/comments")
    }

    public createPostComment(postId, comment): Promise<AxiosResponse<any, any>> {
        return api().post(endpoint + postId + "/comments", comment)
    }

    public getAllPosts(skip=0): Promise<AxiosResponse<any, any>> {
        return api().get(endpoint + "?skip=" + skip)
    }

    public newPost(userId, post): Promise<AxiosResponse<any, any>> {
        return api().post(endpoint+userId, post, {headers: {'Content-Type': 'multipart/form-data'}})
    }
}