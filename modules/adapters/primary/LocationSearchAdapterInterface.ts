import { RefObject} from "react";
import {SearchBoxEvent} from "@tomtom-international/web-sdk-plugin-searchbox";

export type elementRef = RefObject<HTMLDivElement>;
export type event = SearchBoxEvent;

export interface LocationSearchAdapterInterface {
    appendSearch: (element:elementRef) => void;
    removeSearch: () => void
    registerOnSelectedCallback?: (callback: (event: event)=>void) => void;
}