import React, {ReactElement, ReactNode, useEffect, useRef, useState} from 'react';
import {Box, Button, Typography} from "@material-ui/core";
import {useMapContext} from "../context/Map.context";
import {convertESPG4326To3857} from "../../lib/latLng-to-espg3857";
import SearchBox, {SearchBoxEvent} from "@tomtom-international/web-sdk-plugin-searchbox";
import tt from "@tomtom-international/web-sdk-services";
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'
import {createLocation} from "../domain/location";
import {Extent} from "../models/Extent";
import {Attendant, createAttendant} from "../domain/attendant";
import {AttendantsContainer} from "./AttendantsContainer";
import {useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {AttendantsState, AttendantState} from "../atoms/AttendantsState";

interface SearchItemProps {
    children?: ReactNode;
}

const SetLocation = ({children}: SearchItemProps) => {

    const searchContainer = useRef<HTMLDivElement | null>(null);

    const API_KEY = 'enDW8HX6mL8UjAOeXWskWdiBlaAK3Fwa';
    const {mapControl} = useMapContext();
    const attendants = useRecoilValue(AttendantsState)

    const insertAttendant = useRecoilCallback(
        ({set}) => (attendant: Attendant) => {
            set(AttendantsState, (e) => [...e, attendant])


            set(AttendantState(attendant.id), {
                ...attendant
            })

        },
        [attendants.length],
    )

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

        if (!searchContainer.current) {
            return
        }

        const ttSearchBox = new SearchBox(tt.services, searchBoxOptions);
        searchContainer.current.appendChild(ttSearchBox.getSearchBoxHTML());

        ttSearchBox.on('tomtom.searchbox.resultselected', setLocation);

        return () => ttSearchBox.onRemove();
    }, [mapControl])

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const setLocation = (event: SearchBoxEvent): any => {
        const result = event?.data?.result;


        //minLon, minLat, maxLon, maxLat.
        const extent = new Extent(
            result.boundingBox.btmRightPoint.lat,
            result.boundingBox.btmRightPoint.lng,
            result.boundingBox.topLeftPoint.lat,
            result.boundingBox.topLeftPoint.lng,
        )

        const newLocation = createLocation(extent, [result.position.lng, result.position.lat], result.address.municipality)


        const newAtt = createAttendant((getRandomInt(1000000)), 'Jules', newLocation);


        insertAttendant(newAtt)
        
        mapControl.getView().setCenter(convertESPG4326To3857({
            longitude: result.position.lng,
            latitude: result.position.lat
        }));
    }


    return (
        <Box padding={2}>
            <Typography variant='h5' component="h5">Add a Person's location</Typography>
            <div className="search-container">
                <div ref={searchContainer} style={{marginBottom: '1rem'}}></div>
                {attendants.map((attendant: Attendant) => <AttendantsContainer key={attendant.id} attendantId={attendant.id}/>)}
            </div>
        </Box>
    )
}

export default SetLocation