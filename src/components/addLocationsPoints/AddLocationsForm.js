import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const AddAddressPoints = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes}>
      <Grid container>{props.children}</Grid>
    </Container>
  );
};

export default AddAddressPoints;
