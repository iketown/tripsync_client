import React, { Component } from "react"
import { Grid } from "@material-ui/core"
import FlightSearchForm from "../forms/FlightSearchForm"
export class Flights extends Component {
  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12} md={8}>
          <FlightSearchForm />
        </Grid>
        <Grid item xs={12} md={4}>
          MAP
        </Grid>
      </Grid>
    )
  }
}

export default Flights
