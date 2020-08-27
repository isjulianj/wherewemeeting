import React, { useState, useEffect } from "react";

import BingAutoSuggest from "../support/bing/modules/BingAutoSuggest";

// Start Openlayers imports
import { Map, View } from "ol";
import { GeoJSON, XYZ } from "ol/format";
import OSM from "ol/source/OSM";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import {
  Vector as VectorSource,
  OSM as OSMSource,
  XYZ as XYZSource,
  BingMaps,
  TileWMS as TileWMSSource,
} from "ol/source";
import {
  Select as SelectInteraction,
  defaults as DefaultInteractions,
} from "ol/interaction";
import {
  Attribution,
  ScaleLine,
  ZoomSlider,
  Zoom,
  Rotate,
  MousePosition,
  OverviewMap,
  defaults as DefaultControls,
} from "ol/control";
import {
  Style,
  Fill as FillStyle,
  RegularShape as RegularShapeStyle,
  Stroke as StrokeStyle,
} from "ol/style";

import { Projection, get as getProjection, fromLonLat } from "ol/proj";

import { getCoords } from "../support/utils";

// End Openlayers imports

const map = new Map({
  //  Display the map in the div with the id of map
  layers: [
    new TileLayer({
      source: new OSM({
        crossOrigin: "anonymous", // or "use-credentials", but not "none"
        projection: "EPSG:3857",
      }),
    }),
    // new TileLayer({
    //   source: new BingMaps({
    //     visible: false,
    //     preload: Infinity,
    //     crossOrigin: "use-credentials", // or "use-credentials", but not "none"
    //     key: "AnwI1t4Sltp_gadZ9sPd3zxqWYOT39PoAmNwNjG2XSWH5096NMs_QAm5Rchogr5m",
    //     projection: "EPSG:3857",
    //     imagerySet: "RoadOnDemand",
    //   }),
    // }),
  ],
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

const OLMapFragment = () => {
  const [coords, setCoords] = useState([0, 0]);
  const [height, setHeight] = useState(
    window.innerWidth >= 992 ? window.innerHeight : 400
  );
  const [mapZoom, setMapZoom] = useState(0);

  useEffect(() => {
    BingAutoSuggest.search("newbury").then((res) => {
      console.log(res);
    });
  }, []);

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

  // window resize
  useEffect(() => {
    const updateDimensions = () => {
      const newHeight = window.innerWidth >= 992 ? window.innerHeight : 400;
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
