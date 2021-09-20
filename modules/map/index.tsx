import React from 'react';
import dynamic from "next/dynamic";

const NoSSRMapContainer = dynamic(() => import("./components/MapComponent"), {
    ssr: false,
});

export const MapContainer = () => {
    return (
        <>
            <NoSSRMapContainer></NoSSRMapContainer>
        </>
    );
};

