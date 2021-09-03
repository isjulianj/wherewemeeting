import {Map} from "ol";
import {Feature} from "ol";
import {Extent} from "./Extent";
import { transform, fromLonLat } from 'ol/proj';
import {Location} from "../compositions/meeting/meeting.utils";



export const groupOLFeatureExtent = (olMap: Map, featuresArray: Feature[]): void => {

    const finalExtent = new Extent();
    const workingExtent = new Extent();

    if (featuresArray.length === 0) {
        return
    }


    // TODO: Bounds handed over from bing/tomtom API, create function to make own bounds using proj or openlayers
    for (const feature of featuresArray) {
        const featureLocationData: Location = feature.get('_LOCATION_DATA_');
        const olExtent = featureLocationData.bounds.asOlExtent();
        workingExtent.setFromOlExtent(olExtent);
        finalExtent.increaseExtent(workingExtent);
    }

    return fitToExtent(olMap, finalExtent, true);

}


export const fitToExtent = (olMap: Map, extent: Extent, transformCoordsTo3857: boolean) => {

    if (extent === undefined) {
        return
    }
    let olExtent: number[];

    if (transformCoordsTo3857 === true) {

        // transform the data lat lon extent to the map coordinate system 3857
        const minCoords = fromLonLat([extent.getMinCoords()[1], extent.getMinCoords()[0]]);
        const maxCoords = fromLonLat([extent.getMaxCoords()[1], extent.getMaxCoords()[0]]);

        olExtent = [minCoords[0], minCoords[1], maxCoords[0], maxCoords[1]];
    } else {
        olExtent = extent.asOlExtent();
    }

    const view = olMap.getView();


    view.fit(olExtent, {
        size: olMap.getSize(),
        callBack: () => console.log('mapChanges')
    })


}