import React, {useEffect, useRef} from 'react';
import {Box, Button, Typography} from "@material-ui/core";
import {useMapContext} from "../context/Map.context";
import {convertESPG4326To3857} from "../../libs/latLng-to-espg3857";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import tt from "@tomtom-international/web-sdk-services";
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'
import {position} from "polished";


const SetLocation = () => {

    const searchContainer = useRef<HTMLElement>(null);

    const API_KEY = 'enDW8HX6mL8UjAOeXWskWdiBlaAK3Fwa';
    const {mapControl} = useMapContext();

    const ttServices = tt.services;

    const searchOptions = {
        key: API_KEY,
        language: 'en-GB',
        limit: 5
    };

    // Options for the autocomplete service
    const autocompleteOptions = {
        key: API_KEY,
        language: 'en-GB'
    };

    const searchBoxOptions = {
        minNumberOfCharacters: 0,
        searchOptions: searchOptions,
        autocompleteOptions: autocompleteOptions,
        distanceFromPoint: [15.4, 53.0]
    };


    useEffect(() => {
        const ttSearchBox = new SearchBox(tt.services, searchBoxOptions);
        searchContainer.current.appendChild(ttSearchBox.getSearchBoxHTML());

        ttSearchBox.on('tomtom.searchbox.resultselected', setLocation);

        return () => {searchContainer.current.innerHTML = ''};
    }, [])


    const setLocation = (event: any) => {
        const result = event.data.result;

        mapControl.getView().setCenter(convertESPG4326To3857({
            longitude: result.position.lng,
            latitude: result.position.lat
        }))
    }


    return (
        <Box padding={2}>
            <Typography variant='h5' component="h5">Add a Person's location</Typography>
            <div ref={searchContainer} className="search-container">

            </div>
        </Box>
    )
}

export default SetLocation;