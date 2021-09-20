import React, {createContext, ReactNode, useState, useEffect} from 'react';

// Start Openlayers imports
import {Map, PluggableMap} from "ol";
import {Attendants} from "../domain/attendants";
import {Meeting, MeetingStatus} from "../domain/meeting";
import {createUser, User} from "../domain/user";
import {Attendant} from "../domain/attendant";
import {createLocation, Location} from "../domain/location";
import {Extent} from "../models/Extent";
import VectorLayer from "ol/layer/Vector";


interface MapContextValues {
    mapControl: PluggableMap;
    setMapControl: (map: Map) => void;
    meeting?: Meeting;
    setMeeting?: (meeting: Meeting) => void;
    vectorLayer: any;
    setVectorLayer: (olVectorlayer: VectorLayer<import("../source/Vector.js").default<any>>) => void;
}

interface IMapProvider {
    map?: Map | null,
    children?: ReactNode
}

const MapContext = createContext<MapContextValues>({mapControl: null, setMapControl: null, vectorLayer: null, setVectorLayer: null});

export const MapProvider = ({map = null, children}: IMapProvider) => {

    const [meeting, setMeeting] = useState<Meeting>(null);
    const [mapControl, setMapControl] = useState<Map>(null);
    const [vectorLayer, setVectorLayer] = useState<any>(null)

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
        vectorLayer, setVectorLayer
    }


    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    )

}

export const useMapContext = () => React.useContext(MapContext);