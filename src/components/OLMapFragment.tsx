import React, { useState, useEffect } from "react";

// Start Openlayers imports
import { Map, View } from "ol";
// import { GeoJSON, XYZ } from "ol/format";
import OSM from "ol/source/OSM";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import {
  Vector as VectorSource,
  // OSM as OSMSource,
  // XYZ as XYZSource,
  // BingMaps,
  // TileWMS as TileWMSSource,
} from "ol/source";
import {
  Point
} from 'ol/geom';
import Feature from 'ol/Feature'
// import {
//   Select as SelectInteraction,
//   defaults as DefaultInteractions,
// } from "ol/interaction";
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
import {
  Style,
  Icon,
  // Fill as FillStyle,
  // RegularShape as RegularShapeStyle,
  // Stroke as StrokeStyle,
} from "ol/style";

// import { Projection, get as getProjection, fromLonLat } from "ol/proj";
import { fromLonLat } from "ol/proj";
import { getCoords } from "../support/utils";

import { groupFeatureExtent } from '../support/map/MapControl'

// End Openlayers imports


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

let layers = [tileLayer, vectorlayer]


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
});

const olSource = vectorlayer.getSource();



const OLMapFragment = ({ meeting }) => {
  (window as any).olSource = olSource;

  useEffect(() => {
    const pubSub = meeting.pubSub;
    const addFeatures = () => {
      const locations = meeting.getLocations();

      olSource.clear(true);
      const iconFeatures = locations.map(location => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([location.attributes.coords[1], location.attributes.coords[0]])),
          name: location.attributes.suggestion,
        });

        feature.set('_LOCATION_DATA_', location, true);

        return feature
      });

      olSource.addFeatures(iconFeatures)
      olSource.changed();
      groupFeatureExtent(map, iconFeatures)
    }
    const newLocationToken = pubSub.subscribe('LOCATION_ADDED', addFeatures)

    return () => pubSub.unsubscribe(newLocationToken);
  }, [meeting])




  const [coords, setCoords] = useState([0, 0]);
  const [height, setHeight] = useState(
    window.innerWidth >= 992 ? window.innerHeight : 400
  );
  const [mapZoom, setMapZoom] = useState(0);


  // get coords from the browser
  useEffect(() => {
    getCoords()
      .then((position) => {
        const convertedCoords = fromLonLat(
          [position.coords.longitude, position.coords.latitude],
          "EPSG:3857"
        );
        setMapZoom(15);
        setCoords(convertedCoords);
      })
      .catch((err) => {
        console.log(err);
      });



  }, []);




  // add map
  useEffect(() => {
    map.setTarget("map");
    map.getView().setCenter(coords);
    map.getView().setZoom(mapZoom);

    return () => map.setTarget(undefined);
  }, [coords, mapZoom]);


  // useEffect(() => {

  //   const locations = meeting.getLocations();

  //   olSource.clear(true);
  //   const iconFeatures = locations.map(location => {
  //     return new Feature({
  //       geometry: new Point(fromLonLat([location.attributes.coords[1], location.attributes.coords[0]])),
  //       name: location.attributes.suggestion,
  //     })
  //   });


  //   olSource.addFeatures(iconFeatures)
  //   olSource.changed();
  //   console.log('changed')

  // })

  // window resize
  useEffect(() => {
    const updateDimensions = () => {
      const newHeight = window.innerWidth >= 768 ? window.innerHeight : '55vh';
      setHeight(newHeight);
    };
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [height]);

  const style = {
    width: "100%",
    height: height,
    backgroundColor: "#cccccc",
  };

  return <div id="map" style={style}></div>;
};

export default OLMapFragment;
