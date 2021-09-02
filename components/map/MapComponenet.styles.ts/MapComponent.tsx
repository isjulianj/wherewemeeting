import React, {useEffect, useRef, useState} from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import {useMapContext} from "../../../context/Map.context";


const MapComponent = (props: any) => {
    const mapElement = useRef<HTMLDivElement | null>(null);


    const [mapLongitude, setMapLongitude] = useState(-121.91599);
    const [mapLatitude, setMapLatitude] = useState(37.36765);
    const [mapZoom, setMapZoom] = useState(13);
    const {setMapControl} = useMapContext();

    useEffect(() => {
        let map = tt.map({
            key: "enDW8HX6mL8UjAOeXWskWdiBlaAK3Fwa",
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom
        });
        setMapControl(map);
        return () => map.remove();
    }, []);

    return (
        <div ref={mapElement} className="mapDiv" style={{height: '100%'}}></div>
    )

}

export default MapComponent