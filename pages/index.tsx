import type {NextPage} from 'next'
import dynamic from "next/dynamic";

import {Box} from "@material-ui/core";
import {MapProvider} from "../context/Map.context";
import {AttendantsContainer} from "../modules/attendants";
import { MapContainer} from "../modules/map";



// render map in frontend
const NoSSRMapContainer = dynamic(() => import("../modules/map/components/MapComponent"), {
    ssr: false,
});


const Home: NextPage = () => {

    return (
        <MapProvider>
            <Box
                display="grid"
                gridTemplateColumns='1fr 2fr'
                minHeight="100vh"
                justifyContent="center"
            >
                <div className='attendants'>
                    <AttendantsContainer></AttendantsContainer>
                </div>
                <div className='map'>
                    <MapContainer></MapContainer>
                </div>
            </Box>
        </MapProvider>
    )
}

export default Home
