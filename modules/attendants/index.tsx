import React from 'react';
import dynamic from "next/dynamic";

const NoSSRSetLocation = dynamic(() => import("./components/SetLocation"), {
    ssr: false,
});

export const AttendantsContainer = () => {
    return (
        <>
            <NoSSRSetLocation></NoSSRSetLocation>
        </>
    );
};
