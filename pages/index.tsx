import type {NextPage} from 'next'
import dynamic from "next/dynamic";
import {MapProvider} from "../context/Map.context";
import React from "react";



// render map in frontend
const HomeContainerNoSSR = dynamic(() => import("../modules"), {
    ssr: false,
});


const Home: NextPage = () => {

    return (
        <MapProvider>
            <HomeContainerNoSSR/>
        </MapProvider>
    )
}

export default Home
