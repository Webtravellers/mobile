import { UserModel } from './userModel';
export interface PostCommentModel {
    user: UserModel,
    comment: string,
    date: Date,
}