
import React, { FunctionComponent, useEffect, useState } from "react";
import LocationLine from "./LocationLine";

let count = 0;

const AddLocations: FunctionComponent = ({ meeting, openSearchBox, children }) => {




  return (

    <div className="addLocations">
      <div className="addLocations__wrapper">
        {meeting.locations.length !== 0 ? meeting.locations.map(location => {
          return <LocationLine location={location} key={count++} openSearchBox={openSearchBox} />
        }) : <LocationLine location={null} key={count++} openSearchBox={openSearchBox} />}
      </div>
      {children}

    </div>



  )

};

export default AddLocations;
