import React from "react";
import "./App.css";
import OLMapFragment from "./components/OLMapFragment";
import AddLocationsForm from "./components/addLocationsPoints/AddLocationsForm";
import LocationInput from "./components/addLocationsPoints/LocationInput";

function App() {
  const inputDetails = {
    id: "hello",
  };

  return (
    <main className="App">
      <AddLocationsForm>
        <LocationInput inputDetails={inputDetails} />
      </AddLocationsForm>
      <OLMapFragment />
    </main>
  );
}

export default App;
