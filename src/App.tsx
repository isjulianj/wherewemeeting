import React, { useState } from "react";
import "./App.css";
import OLMapFragment from "./components/OLMapFragment";
import AddLocationsForm from "./components/addLocationsPoints/AddLocationsForm";
import LocationInput from "./components/addLocationsPoints/LocationInput";

import styles from "./styleModules/app.module.css";

const App = () => {
  const inputDetails = {
    id: "hello",
  };

  const [appState, setAppState] = useState({
    locations: [],

  })

  return (
    <main className="App container-fluid">
      <div className={"row " + styles.wrapper}>
        <div className={styles.wrapper__inputs}>
          <AddLocationsForm>
            <LocationInput inputDetails={inputDetails} />
          </AddLocationsForm>
        </div>
        <div className={styles.wrapper__map}>
          <OLMapFragment />
        </div>
      </div>
    </main>
  );
}

export default App;
