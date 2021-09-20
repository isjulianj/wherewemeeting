import {atom} from "recoil";
import {Map} from "ol";

export const OlMapState = atom<Map>({
    key: 'olMapState',
    default: null,
});