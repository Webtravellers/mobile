import Location from "./LocationModel";

export interface UserModel {
    _id: string;
    email: string;
    followers:  string[];
    following: string[];
    fullname: string,
    token: string,
    bio: string,
    photo: string,
    wallpaper: string,
    favoritesList?: Location[],
    name?: string,
    lastname?: string,
}