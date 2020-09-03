import { Feature } from "openlayers";
import Extent from "./Extent";
import OLMapFragment from "../../components/OLMapFragment";
import Location from "../Location";
import { transform, fromLonLat } from 'ol/proj'


export const groupFeatureExtent = (map, featuresArray: Feature[]): void => {

    const finalExtent = new Extent();
    const workingExtent = new Extent();

    if (featuresArray.length === 0) {
        return
    }


    // TODO: Bounds handed over from bing API, create function to make own bounds using proj or openlayers
    for (const feature of featuresArray) {
        const featureLocationData: Location = feature.get('_LOCATION_DATA_');
        const olExtent = featureLocationData.attributes.bounds.asOlExtent();
        workingExtent.setFromOlExtent(olExtent);
        finalExtent.increaseExtent(workingExtent);
    }

    return fitToExtent(map, finalExtent, true);

}


export const fitToExtent = (map, extent: Extent, transformCoordsTo3857: boolean) => {

    console.log('hello')
    if (extent === undefined) {
        return
    }
    let olExtent: number[];
    debugger;
    if (transformCoordsTo3857 === true) {

        // trnasform the data lat lon extent to the map coordinate system 3857
        const minCoords = fromLonLat([extent.getMinCoords()[1], extent.getMinCoords()[0]]);
        const maxCoords = fromLonLat([extent.getMaxCoords()[1], extent.getMaxCoords()[0]]);

        olExtent = [minCoords[0], minCoords[1], maxCoords[0], maxCoords[1]];
    } else {
        olExtent = extent.asOlExtent();
    }

    const view = map.getView();


    view.fit(olExtent, {
        size: map.getSize(),
        callBack: () => console.log('mapChanges')
    })


}