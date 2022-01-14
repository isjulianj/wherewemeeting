import {atom} from "recoil";

export const AttendantInfoState = atom<boolean>({
    key: 'attendantInfoState',
    default: false,
});