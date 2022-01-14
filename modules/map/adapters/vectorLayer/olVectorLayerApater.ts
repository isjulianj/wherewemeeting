import {Feature, Map} from "ol";
import {fromLonLat} from "ol/proj";
import {buffer, Extent as olExtent} from 'ol/extent';
import {Attendant} from "../../../../domain/attendant";
import {OlExtent} from "../../../../core/models/OlExtent";



export const groupOLFeatureExtent = (featuresArray: Feature<any>[], locationDataPropertyName: string = '_LOCATION_DATA_'): OlExtent => {

    const finalExtent = new OlExtent();
    const workingExtent = new OlExtent();

    if (featuresArray.length === 0) {
        return null
    }


    // TODO: Bounds handed over from bing/tomtom API, create function to make own bounds using proj or openlayers
    for (const feature of featuresArray) {
        const featureLocationData: Attendant = feature.get(locationDataPropertyName);
        const olExtent = featureLocationData.location.bounds.asOlExtent();
        workingExtent.setFromOlExtent(olExtent);
        finalExtent.increaseExtent(workingExtent);
    }

    return finalExtent;

}

const bufferOlExtent = (olExtent: olExtent) => {
    //TODO: this needs to be reviewed
    return buffer(olExtent, 1000000)
}

export const fitToExtent = (olMap: Map, extent: OlExtent, transformCoordsTo3857: boolean) => {

    if (extent === undefined) {
        return
    }
    const view = olMap.getView();
    let olExtent: number[];

    if (transformCoordsTo3857 === true) {

        // transform the data lat lon extent to the map coordinate system 3857
        const minCoords = fromLonLat([extent.getMinCoords()[1], extent.getMinCoords()[0]]);
        const maxCoords = fromLonLat([extent.getMaxCoords()[1], extent.getMaxCoords()[0]]);

        olExtent = [minCoords[0], minCoords[1], maxCoords[0], maxCoords[1]];
        olExtent = [minCoords[0], minCoords[1], maxCoords[0], maxCoords[1]];
    } else {
        olExtent = extent.asOlExtent();
    }


    const bufferedExtent = bufferOlExtent(olExtent);


    view.fit(bufferedExtent, {
        size: olMap.getSize(),
    })


}
