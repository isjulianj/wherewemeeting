import {Attendant} from "./attendant";

export type Attendants = Attendant[];


/**
 * Add an attendant
 * @param attendants
 * @param newAttendant
 */
export function addAttendant(currentAttendants: Attendants, newAttendant: Attendant): Attendant[] {
    return [ ...currentAttendants, newAttendant ];
}