import {Extent} from "../models/Extent";

export type Location = {
    bounds: Extent;
    coords: number[];
    locationName: LocationName;
}

/**
 * Create a new Location
 * @param bounds
 * @param coords
 * @param locationName
 */
export const createLocation = (bounds: Extent, coords: number[], locationName: LocationName): Location => {
    return {
        bounds,
        coords,
        locationName
    }
}