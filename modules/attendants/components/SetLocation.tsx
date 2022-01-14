import React, {useEffect, useRef,} from 'react';
import {Box, Typography} from "@mui/material";
import {convertESPG4326To3857} from "../../../lib/latLng-to-espg3857";
import {SearchBoxEvent} from "@tomtom-international/web-sdk-plugin-searchbox";
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'
import {Extent} from "../../../core/models/Extent";
import {Attendant, createAttendant} from "../../../domain/attendant";
import {useRecoilCallback, useRecoilValue} from "recoil";
import {AttendantsState, AttendantState} from "../../../core/state/AttendantsState";
import {useMapContext} from "../../../context/Map.context";
import {useTomTomLocationService} from "../../services/TomTomLoactionService";
import {useBuildLocation} from "../../../application/createLocation";


const SetLocation = () => {
    // refs
    const searchContainer = useRef<HTMLDivElement | null>(null);

    // state
    const {mapControl} = useMapContext();
    const attendants = useRecoilValue(AttendantsState)
    const insertAttendant = useRecoilCallback(
        ({set}) => (attendant: Attendant) => {
            set(AttendantsState, (existingAttendants) => [...existingAttendants, attendant])


            set(AttendantState(attendant.id), {
                ...attendant
            })

        },
        [attendants],
    )

    // services
    const {appendSearch, registerOnSelectedCallback, removeSearch} = useTomTomLocationService()
    const {buildLocation} = useBuildLocation();

    // When map is mounted properly
    // set up the search service
    useEffect(() => {

        if (!searchContainer.current) {
            return
        }
        appendSearch(searchContainer)

        registerOnSelectedCallback(setLocation)


        return () => removeSearch();
    }, [mapControl])

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const setLocation = (event: SearchBoxEvent): any => {
        // @ts-ignore
        const result = event?.data?.result;

        console.log(result)

        //minLon, minLat, maxLon, maxLat.


        const extent = new Extent(
            result?.boundingBox?.btmRightPoint?.lat ?? 0,
            result?.boundingBox?.topLeftPoint?.lng ?? 0,
            result?.boundingBox?.topLeftPoint?.lat ?? 0,
            result?.boundingBox?.btmRightPoint?.lng ?? 0,
        )

        const newLocation = buildLocation({
            extent,
            coords: [result.position.lng, result.position.lat],
            locationName: result.address.municipality
        })


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
                <div ref={searchContainer} style={{marginBottom: '1rem'}}/>

            </div>
        </Box>
    )
}

export default SetLocation
