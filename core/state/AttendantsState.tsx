import {atom, atomFamily} from "recoil";
import {Attendant, createAttendant} from "../../domain/attendant";
import {createLocation} from "../../domain/location";
import {Extent} from "../models/Extent";


const DefaultAtom: Attendant = {
    id: null,
    name: null,
    isUser: false,
    location: null,
};


export const AttendantState = atomFamily<Attendant, UniqueId>({
    key: 'attendant',
    default: DefaultAtom,
    effects_UNSTABLE: [({onSet, setSelf, node}) => {
        const storeData = localStorage.getItem(node.key)
        if (storeData !== null) {
            let data = JSON.parse(storeData);
            const bounds = new Extent(data.location.bounds)
            const location = createLocation(bounds, data.location.coords, data.location.locationName);
            const attendant = createAttendant(data.id, data.name, location)

            setSelf(attendant)
        }

        onSet((newIds) => {
            if (newIds === DefaultAtom) {
                localStorage.removeItem(node.key)
            } else {
                localStorage.setItem(node.key, JSON.stringify(newIds))
            }
        })
    }]
})

export const AttendantsState = atom<Attendant[]>({
    key: 'attendants',
    default: [],
    effects_UNSTABLE: [({onSet, setSelf, node}) => {
        const storeData = localStorage.getItem(node.key)
        if (storeData !== null) {
            let data = JSON.parse(storeData);
            const newData = data.map((storedAttendant: any) => {
                const bounds = new Extent(storedAttendant.location.bounds)
                const location = createLocation(bounds, storedAttendant.location.coords, storedAttendant.location.locationName);
                return createAttendant(storedAttendant.id, storedAttendant.name, location)
            });
            setSelf(newData)
        }

        onSet((newIds) => {
            if (newIds === []) {
                localStorage.removeItem(node.key)
            } else {
                localStorage.setItem(node.key, JSON.stringify(newIds))
            }
        })
    }]
});


