import { LocationType } from './LocationTypeModel';
import { Point } from './Point';
import { City } from './CityModel';
import { Comment } from './CommentModel';
interface Location {
    _id: string,
    name: string;
    rate: number;
    desc: string;
    photos: string[];
    city: City;
    comments: Comment[],
    location: Point;
    type: LocationType[],
    status: boolean,
}

export default Location;