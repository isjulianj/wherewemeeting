import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {useMapContext} from "../../context/Map.context";
import {getBrowserCoords} from "../../../lib/get-browser-coords";

// Start Openlayers imports
import {Map, View} from "ol";
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
import {Marker} from "./Marker";
import {useRecoilState} from "recoil";
import {BrowserLocationState} from "../../atoms/BrowserLocationState";


interface IMapComponentProps {
    children: ReactNode
}

const MapComponent = ({children}: IMapComponentProps) => {
    const mapElement = useRef<HTMLDivElement | null>(null);
    const [coords, setCoords] = useState([0, 0]);
    const [browserCoords, setBrowserCoords] = useRecoilState(BrowserLocationState)
    const [mapZoom, setMapZoom] = useState(13);
    const {mapControl, setMapControl} = useMapContext();

    const tileLayer = new TileLayer({
        source: new OSM({
            crossOrigin: "anonymous", // or "use-credentials", but not "none"
        }),
    });

    const vectorlayer = new VectorLayer({
        className: 'attendants',
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
        getBrowserCoords()
            .then((position) => {
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


        // (window.map as any) = map;

        return () => map.setTarget(undefined);
    }, []);

    useEffect(() => {
        if (!mapControl) return
        mapControl.getView().setCenter(browserCoords);
        mapControl.getView().setZoom(mapZoom);
    }, [browserCoords])

    return (
        <div ref={mapElement} className="mapDiv" id="map" style={{height: '100%'}}>
            <Marker></Marker>
            {children}
        </div>
    )

}

export default MapComponent