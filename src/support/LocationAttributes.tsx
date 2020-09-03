import MeetingHeader from "./MeetingHeader";
import IlocationData from "./interfaces/ILocationData";
import Extent from "./map/Extent";




class LocationAttributes {

    meetingHeader: MeetingHeader
    bounds: Extent;
    coords: number[];
    suggestion: string;
    locationOwner: string;
    ownerID: string;

    constructor(data: IlocationData) {
        this.bounds = data.bounds;
        this.coords = data.coords;
        this.suggestion = data.suggestion;
        this.locationOwner = data.locationOwner || null;
        this.ownerID = data.ownerID || null;


    }
}

export default LocationAttributes;