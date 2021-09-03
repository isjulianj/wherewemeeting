import {Extent} from "../../models/Extent";

export interface IMeeting {
    guests: Guest[]
}

export interface Location {
    bounds: Extent;
    coords: number[];
    locationName: string;
}

export interface Guest {
    id: string;
    name: string;
    location: Location
}