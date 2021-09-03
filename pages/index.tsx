import type {NextPage} from 'next'
import dynamic from "next/dynamic";
import {MapProvider} from "../core/context/Map.context";
import SetLocation from "../core/components/SetLocation";
import {Box} from "@material-ui/core";


// render map in frontend
const NoSSRMapContainer = dynamic(() => import("../core/components/map/MapComponent"), {
    ssr: false,
});const NoSSRSetLocation = dynamic(() => import("../core/components/SetLocation"), {
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
                <div>
                    <NoSSRSetLocation></NoSSRSetLocation>
                </div>
                <div>
                    <NoSSRMapContainer></NoSSRMapContainer>
                </div>
            </Box>

        </MapProvider>
    )
}

export default Home
