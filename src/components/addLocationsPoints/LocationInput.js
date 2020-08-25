import React from "react";
import { TextField } from "@material-ui/core/";

const LocationInput = ({ inputDetails }) => {
  return (
    <div>
      <TextField id={inputDetails.id} label="Add Address" />
      <aside id="aside"></aside>
    </div>
  );
};

export default LocationInput;
