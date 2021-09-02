import React from 'react';
import {Button} from "@material-ui/core";
import {useMapContext} from "../context/Map.context";

const SetLocation = () => {

    const {mapControl} = useMapContext();

    const setLocation = () => {
        mapControl.easeTo({
            center: [ 13.2846508,52.5067614],
            zoom: 16
        })
    }
    
    return (
        <Button onClick={setLocation}>Set Locations</Button>
    )
}

export default SetLocation;