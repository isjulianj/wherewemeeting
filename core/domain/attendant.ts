import {User} from "./user";
import {Location} from "./location";

export type Attendant = {
    id: UniqueId;
    name: string;
    isUser: boolean;
    user?: User;
    location: Location;
}

/**
 * Get the location of attendant in a meeting
 * @param {Attendant} attendant
 */
export const getAttendantLocation = (attendant: Attendant) => {
    return attendant.location;
}

export const createAttendant = (id: number, name: string, location: Location): Attendant => {
    return {
        id,
        name,
        isUser: false,
        location
    }
}