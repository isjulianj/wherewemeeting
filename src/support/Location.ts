import MeetingHeader from "./MeetingHeader";

import LocationAttributes from './LocationAttributes'
import IlocationData from "./interfaces/ILocationData";


class Location {
    attributes: LocationAttributes;
    meetingHeader: MeetingHeader;

    constructor(meetingHeader: MeetingHeader, data: IlocationData) {
        this.meetingHeader = meetingHeader;
        this.attributes = new LocationAttributes(data)
    }

}

export default Location