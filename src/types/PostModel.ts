import { PostCommentModel } from './PostCommentModel';
import { UserModel } from './userModel';
export interface PostModel {
    photo: string,
    caption: string,
    likes_count: number,
    likes: UserModel[],
    postedBy: UserModel,
    comments: PostCommentModel[],
    createdAt: Date,
}