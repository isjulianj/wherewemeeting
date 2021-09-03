import React, {useEffect, useRef, useState} from 'react';
import {useMapContext} from "../../context/Map.context";
import {getCoords} from "../../../libs/get-coords";

// Start Openlayers imports
import { Map, View } from "ol";
import {fromLonLat} from "ol/proj";
import VectorSource from "ol/source/Vector";
import {Icon, Style} from "ol/style";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import VectorLayer from "ol/layer/Vector";
import {
    // Attribution,
    ScaleLine,
    ZoomSlider,
    // Zoom,
    // Rotate,
    // MousePosition,
    OverviewMap,
    defaults as DefaultControls,
} from "ol/control";


const MapComponent = (props: any) => {
    const mapElement = useRef<HTMLDivElement | null>(null);
    const [coords, setCoords] = useState([0, 0]);
    const [browserCoords, setBrowserCoords] = useState<number[]>([-121.91599, 37.36765])
    const [mapZoom, setMapZoom] = useState(13);
    const {setMapControl} = useMapContext();

    const tileLayer = new TileLayer({
        source: new OSM({
            crossOrigin: "anonymous", // or "use-credentials", but not "none"
            projection: "EPSG:3857",
        }),
    });

    const vectorlayer = new VectorLayer({
        className: 'locations',
        source: new VectorSource({
            features: []
        }),
        style: new Style({
            image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: 'https://openlayers.org/en/latest/examples/data/icon.png'
            })
        })
    })

    const layers = [tileLayer, vectorlayer]


    // get coords from the browser
    useEffect(() => {
        getCoords()
            .then((position) => {
                console.log(position);
                const convertedCoords = fromLonLat(
                    [position.coords.longitude, position.coords.latitude],
                    "EPSG:3857"
                );
                setMapZoom(15);
                setBrowserCoords(convertedCoords);
            })
            .catch((err) => {
                console.log(err);
            });



    }, []);

    useEffect(() => {
        const map = new Map({
            //  Display the map in the div with the id of map
            layers,
            // Add in the following map controls
            controls: DefaultControls().extend([
                new ZoomSlider(),
                // new MousePosition(),
                new ScaleLine(),
                new OverviewMap(),
            ]),

            // Render the tile layers in a map view with a Mercator projection
            view: new View({
                projection: "EPSG:3857",
                zoom: 2,
            }),
            target: mapElement.current,
        });

        setMapControl(map);

        map.setTarget("map");
        map.getView().setCenter(browserCoords);
        map.getView().setZoom(mapZoom);

        return () => map.setTarget(undefined);
    }, []);

    return (
        <div ref={mapElement} className="mapDiv" id="map" style={{height: '100%'}}></div>
    )

}

export default MapComponent