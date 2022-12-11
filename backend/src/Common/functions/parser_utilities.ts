import { location } from "../interfaces/location.interface";
export function getLocationFromJson(json_string: string): location{
    const json = JSON.parse(json_string);
    let Location: location = {
        lat: json.lat,
        lng: json.lng,
    }
    return Location;
}