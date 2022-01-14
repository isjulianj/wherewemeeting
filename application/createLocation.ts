import {Extent} from "../core/models/Extent";
import {createLocation, Location} from "../domain/location";

interface CreateLocationInterface {
    extent: Extent;
    coords: number[];
    locationName:  string

}

export const useBuildLocation = () => {
    function buildLocation(locationData: CreateLocationInterface): Location {
        const extent = locationData.extent;

        if (extent.isValid()) {
            return createLocation(locationData.extent, locationData.coords, locationData.locationName)
        }
        return createLocation(null, locationData.coords, locationData.locationName)


    }

    return {buildLocation}
}