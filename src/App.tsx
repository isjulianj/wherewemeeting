import React, { FunctionComponent, useState } from "react";
import "./App.css";
import OLMapFragment from "./components/OLMapFragment";
import AddLocations from "./components/addLocationsPoints/AddLocations";
import TextInputWithAddRemoveButton from "./components/addLocationsPoints/TextInputWithAddRemoveButton";

import styles from "./styleModules/app.module.css";
import MeetingHeader from "./support/MeetingHeader";
import IlocationData from "./support/interfaces/ILocationData";
import LocationLine from "./components/addLocationsPoints/LocationLine";
import Extent from "./support/map/Extent";


interface IAppState {
  lang: string,
  authenticated: boolean,
  theme: string,
  locations: any[]
}


const meeting: MeetingHeader = new MeetingHeader();


const App: FunctionComponent<IAppState> = () => {
  // const [appState, setAppState] = useState({
  //   lang: 'en',
  //   authenticated: true,
  //   theme: 'light',
  //   locations: []

  // });


  // TODO: remove from live
  (window as any).meeting = meeting;

  const [locationLength, setLocationLength] = useState(meeting.locations.length)
  const [searchPanelOpen, setsearchPanelOpen] = useState({ open: false, location: null });


  const addLocation = (locationData: IlocationData) => {
    meeting.addLocation(locationData)
    setLocationLength(meeting.locations.length);

  };



  const openSearchBox = (location: Location = null) => {
    console.log(location)
    setsearchPanelOpen(prevState => {
      return { open: !prevState.open, location: location }
    })
  }





  return (
    <main className="App container-fluid">
      <div className={"row " + styles.wrapper}>
        <TextInputWithAddRemoveButton addLocation={addLocation} searchPanelOpen={searchPanelOpen} />
        <div className={styles.wrapper__inputs}>
          <AddLocations meeting={meeting} openSearchBox={openSearchBox}>
          </AddLocations>
        </div>
        <div className={styles.wrapper__map}>
          <OLMapFragment meeting={meeting} />
        </div>
      </div>
    </main >
  );
}

export default App;
