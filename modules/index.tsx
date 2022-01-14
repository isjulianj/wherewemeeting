import React from 'react';
import {Box } from "@mui/material";
import {AttendantsContainer} from "./attendants";
import {MapContainer} from "./map";
import {AttendantListItem} from "./attendants/components/AttendantsListContainer";
import {Attendant} from "../domain/attendant";
import {useRecoilState} from "recoil";
import {AttendantsState} from "../core/state/AttendantsState";

export default function HomeContainer() {
    const [attendants] = useRecoilState(AttendantsState);
    return (
        <>
            <Box
                display="grid"
                gridTemplateColumns='1fr'
                minHeight="100vh"
                justifyContent="center"
                position='relative'
            >
                <div style={{position: 'absolute', top: 0, left: 0, zIndex: 10}} className='attendants'>
                    <AttendantsContainer/>
                </div>
                <div style={{height: '100vh', width: '100%'}} className='map'>
                    <MapContainer/>
                </div>
                <div style={{display: 'flex', width: '100%', position: 'absolute', bottom: 0, left: 0, zIndex: 10}}>
                    {/*<AttendantsListContainer>*/}
                    {attendants && attendants.map((attendant: Attendant) => <AttendantListItem
                        key={attendant.id} attendantItem={attendant}/>)}
                    {/*</AttendantsListContainer>*/}
                </div>
            </Box>
        </>

    );
};



