import React, {useContext, useEffect} from 'react';

import {Feature} from "ol";
import {Point} from "ol/geom";
import {Icon, Style} from "ol/style";
import { useRecoilState} from "recoil";
import {AttendantsState} from "../../../core/state/AttendantsState";
import {useMapContext} from "../../../context/Map.context";
import {convertESPG4326To3857} from "../../../lib/latLng-to-espg3857";
import {fitToExtent, groupOLFeatureExtent} from "../adapters/vectorLayer/olVectorLayerApater";

export const Marker = ({id}: any): null => {
    const {mapControl, vectorImageLayer} = useMapContext()

    const [attendants] = useRecoilState(AttendantsState)


    useEffect(() => {
        if (!mapControl) return
        if (!attendants) return

        const source = vectorImageLayer.getSource()

        const iconStyle = new Style({
            image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                //TODO: make some global variable options avail.. use image etc
                src: '//openlayers.org/en/latest/examples/data/icon.png',
            }),
        });


        attendants.forEach((attendant, index) => {

            const coords = convertESPG4326To3857({
                longitude: attendant.location.coords[0],
                latitude: attendant.location.coords[1]
            })

            const iconFeature = new Feature({
                geometry: new Point(coords),
                _LOCATION_DATA_: attendant,
            });

            iconFeature.setStyle(iconStyle);

            source.addFeature(iconFeature)


        })


        if (attendants.length> 0    ) {
            const features = source.getFeatures();
            const featureExtent = groupOLFeatureExtent(features)

            fitToExtent(mapControl, featureExtent, true)
        }


        return () => vectorImageLayer.getSource().clear()

    }, [mapControl, attendants])


    return null
};