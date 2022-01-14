import {Attendant} from "./attendant";
import {User} from "./user";
import {Location} from "./location";


export type MeetingStatus = "new" | "planning" | "complete"

export type Meeting = {
    id: UniqueId;
    title: string;
    meetingStatus: MeetingStatus;
    createdDate: DateTimeString;
    centroid: Location;
    user: User;
    attendants: Attendant[];
}

/**
 * Get attendants added to the meeting.
 * @param {Meeting} meeting
 */
export const getAttendants = (meeting: Meeting) => {
    return meeting.attendants;
}

