import {Source} from "ol/source";
import VectorSource from "ol/source/Vector";
import {Geometry} from "ol/geom";
import {Map} from "ol";
import VectorImageLayer from "ol/layer/VectorImage";

export const centerToOLMapFeatures = (olMap: Map, vectorImageLayer: VectorImageLayer<any>) => {
    const view = olMap.getView();
    const source: VectorSource<Geometry> = vectorImageLayer.getSource();

    const features = source.getFeatures();



    view.fit(bufferedExtent, {
        size: olMap.getSize(),
    })
}