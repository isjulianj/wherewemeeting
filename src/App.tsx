import React, { FunctionComponent } from "react";
import "./App.css";
import OLMapFragment from "./components/OLMapFragment";
import AddLocations from "./components/addLocationsPoints/AddLocations";
import TextInputWithAddRemoveButton from "./components/addLocationsPoints/TextInputWithAddRemoveButton";

import styles from "./styleModules/app.module.css";
import MeetingHeader from "./support/MeetingHeader";
import IlocationData from "./support/interfaces/ILocationData";


interface IAppState {
  lang: string,
  authenticated: boolean,
  theme: string,
  locations: any[]
}





const App: FunctionComponent<IAppState> = () => {

  // const [appState, setAppState] = useState({
  //   lang: 'en',
  //   authenticated: true,
  //   theme: 'light',
  //   locations: []

  // });
  const meeting: MeetingHeader = new MeetingHeader();

  // TODO: remove from live
  (window as any).meeting = meeting;

  const addLocation = (locationData: IlocationData) => {
    meeting.addLocation(locationData)
    // setAppState(prevState => {
    //   const locations = [...prevState.locations];

    //   locations.push(locationData)

    //   return { ...prevState, locations }
    // });
  };

  return (
    <main className="App container-fluid">
      <div className={"row " + styles.wrapper}>
        <div className={styles.wrapper__inputs}>
          <AddLocations>
            <TextInputWithAddRemoveButton addLocation={addLocation} />
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
