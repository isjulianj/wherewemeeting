import React, {useEffect, useRef, useState} from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import {useMapContext} from "../../context/Map.context";
import {getBrowserCoords} from "../../../lib/get-browser-coords";
import {fromLonLat} from "ol/proj";


const MapComponentTomTom = (props: any) => {
    const mapElement = useRef<HTMLDivElement | null>(null);
    const [browserCoords, setBrowserCoords] = useState<[number, number]>([-121.91599, 37.36765])
    const [mapZoom, setMapZoom] = useState(13);
    const {setMapControl} = useMapContext();

    // get coords from the browser
    useEffect(() => {
        getBrowserCoords()
            .then((position) => {
                console.log('hi trying to get details');
                const convertedCoords = fromLonLat(
                    [position.coords.longitude, position.coords.latitude],
                    "EPSG:3857"
                );
                setMapZoom(15);
                setBrowserCoords([position.coords.longitude, position.coords.latitude]);
            })
            .catch((err) => {
                console.log(err);
            });



    }, []);

    useEffect(() => {
        let map = tt.map({
            key: "enDW8HX6mL8UjAOeXWskWdiBlaAK3Fwa",
            container: mapElement.current,
            center: browserCoords,
            zoom: mapZoom
        });
        // where you need an adapter
        // setMapControl(map);

        console.log(map)
        return () => map.remove();
    }, []);

    return (
        <div ref={mapElement} className="mapDiv" style={{height: '100%'}}></div>
    )

}

export default MapComponentTomTom