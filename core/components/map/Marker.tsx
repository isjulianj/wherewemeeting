import React, {useContext, useEffect} from 'react';
import {useMapContext} from "../../context/Map.context";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {Icon, Style} from "ol/style";
import {convertESPG4326To3857} from "../../../lib/latLng-to-espg3857";
import VectorLayer from "ol/layer/Vector";

export const Marker = (): null => {
    const {mapControl, attendants} = useMapContext()



    useEffect(()=> {
        if (!mapControl) return

        attendants.forEach(attendant => {

            const coords = convertESPG4326To3857({longitude: attendant.location.coords[0], latitude: attendant.location.coords[1]})

            const iconFeature = new Feature({
                geometry: new Point(coords),
                name: 'Null Island',
                population: 4000,
                rainfall: 500,
            });

            const iconStyle = new Style({
                image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '//openlayers.org/en/latest/examples/data/icon.png',
                }),
            });

            iconFeature.setStyle(iconStyle);

            mapControl.getLayers().getArray()[1].getSource().addFeature(iconFeature)

            console.log(attendants)
        })



        return () => mapControl.getLayers().getArray()[1].getSource().clear()

    }, [mapControl, attendants])



    return null
};