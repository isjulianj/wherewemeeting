import React, { useEffect } from 'react'
import Location from "../../support/Location"


type LocationProps = {
    location: Location,
    openSearchBox: any
}


const LocationLine = ({ location, openSearchBox }: LocationProps) => {


    if (location instanceof Location) {
        return (
            <div className="locationLine row g-3" onClick={() => openSearchBox(location)}>
                <div className="col-6 col-sm-4">
                    <span className="form-control locationLine__name">{location.attributes.locationOwner}</span>
                </div>
                <div className="col-6 col-sm-8">
                    <span className="form-control locationLine__address">{location.attributes.suggestion}</span>

                </div>
            </div>



        )
    } else {
        return (
            <div className="locationLine row g-3" onClick={() => openSearchBox()}>
                <div className="col-6 col-sm-4">
                    <span className="form-control locationLine__name disabled">Add Name</span>
                </div>
                <div className="col-6 col-sm-8">
                    <span className="form-control locationLine__address disbaled">Search Location</span>
                </div>
            </div>
        )
    }
}

export default LocationLine;