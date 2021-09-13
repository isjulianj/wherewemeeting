import React, {createContext, ReactNode,useState, useEffect} from 'react';

// Start Openlayers imports
import {Map, PluggableMap} from "ol";
import {Attendants} from "../domain/attendants";
import {Meeting, MeetingStatus} from "../domain/meeting";
import {createUser, User} from "../domain/user";
import {Attendant} from "../domain/attendant";
import {createLocation, Location} from "../domain/location";
import {Extent} from "../models/Extent";

interface MapContextValues {
    mapControl: PluggableMap;
    setMapControl: (map: Map) => void;
    meeting?: Meeting;
    setMeeting?: (meeting: Meeting) => void;
    attendants?: Attendant[];
    setAttendants?: (attendants: (oldAttendants: Attendant[]) => (Attendant | Attendant)[]) => void;
}

interface IMapProvider {
    map?: Map | null,
    children?: ReactNode
}

const MapContext = createContext<MapContextValues>({mapControl: null, setMapControl: null});

export const MapProvider = ({map = null, children}: IMapProvider) => {

    const [meeting, setMeeting] = useState<Meeting>(null);
    const [mapControl, setMapControl] = useState<Map>(null);
    const [attendants, setAttendants] = useState<Attendant[]>([]   );

    // initial meeting


    useEffect(() => {
        setMeeting({
            id: 1,
            title: 'Summer pub bike challenge',
            meetingStatus: 'new',
            createdDate: new Date().toISOString(),
            // TODO: This would perhaps be browser location, or user's default location
            centroid: createLocation(new Extent(1, 1, 1, 1), [1, 1], 'MainLocations'),
            user: createUser(),
            attendants: []
        })
    }, [])

    const value = {
        mapControl,
        setMapControl,
        meeting,
        setMeeting,
        attendants,
        setAttendants
    }


    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    )

}

export const useMapContext = () => React.useContext(MapContext);