import {atom, atomFamily, selector} from "recoil";
import {Attendant} from "../domain/attendant";
import {User} from "../domain/user";
import {Location} from "../domain/location";

export const AttendantsState = atom<Attendant[]>({
    key: 'attendants',
    default: [],
});

export const AttendantState = atomFamily<Attendant, UniqueId>({
    key: 'attendant',
    default: {
        id: null,
        name: null,
        isUser: false,
        location: null,
    }
})
