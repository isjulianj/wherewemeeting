import React, {createContext, ReactNode} from 'react';
import {useState} from "react";
// Start Openlayers imports
import { Map } from "ol";

interface MapContextValues {
    mapControl: Map;
    setMapControl: (map: Map) => void;
}

interface IMapProvider {
    map?: Map | null,
    children?: ReactNode
}

const MapContext = createContext<MapContextValues>({mapControl: null, setMapControl: null});

export const MapProvider = ({map = null, children}: IMapProvider) => {

    const [mapControl, setMapControl] = useState<Map>();

    return (
        <MapContext.Provider value={{mapControl, setMapControl}}>
            {children}
        </MapContext.Provider>
    )

}

export const useMapContext = () => React.useContext(MapContext);