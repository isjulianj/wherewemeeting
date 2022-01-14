import React, {createContext, ReactNode, useState, useEffect} from 'react';

// Start Openlayers imports
import {Map, PluggableMap} from "ol";
import {Meeting} from "../domain/meeting";
import {createUser} from "../domain/user";
import {createLocation} from "../domain/location";
import {Extent} from "../core/models/Extent";
import VectorImageLayer from "ol/layer/VectorImage";


interface MapContextValues {
    mapControl: PluggableMap;
    setMapControl: (map: Map) => void;
    meeting?: Meeting;
    setMeeting?: (meeting: Meeting) => void;
    vectorImageLayer: VectorImageLayer<any>;
    setVectorImageLayer: (olVectorImageLayer: VectorImageLayer<any>) => void;
}

interface IMapProvider {
    map?: Map | null,
    children?: ReactNode
}

const MapContext = createContext<MapContextValues>({mapControl: null, setMapControl: null, vectorImageLayer: null, setVectorImageLayer: null});

export const MapProvider = ({map = null, children}: IMapProvider) => {

    const [meeting, setMeeting] = useState<Meeting>(null);
    const [mapControl, setMapControl] = useState<Map>(null);
    const [vectorImageLayer, setVectorImageLayer] = useState<any>(null)

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
        vectorImageLayer: vectorImageLayer,
        setVectorImageLayer: setVectorImageLayer
    }


    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    )

}

export const useMapContext = () => React.useContext(MapContext);