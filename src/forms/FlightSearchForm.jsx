import React, { Component } from "react"
import { Form, Field } from "react-final-form"
import { Grid, Button, TextField } from "@material-ui/core"
import { InlineDatePicker } from "material-ui-pickers"
import { showMe } from "../helpers/showMe"
import addDays from "date-fns/addDays"
import { ApolloConsumer, Mutation } from "react-apollo"
import gql from "graphql-tag"
//
import DatePicker from "./formComponents/DatePicker.jsx"
import ReturnTripRadio from "./formComponents/ReturnTripRadio"
import AddRemoveTravelers from "./formComponents/AddRemoveTravelers"
import TravelersOriginList from "./formComponents/TravelersOriginList.jsx"
import DestinationPicker from "./formComponents/DestinationPicker"
import { ArcherContainer, ArcherElement } from "react-archer"
import AirportAutocomplete from "./formComponents/AirportAutocomplete.jsx"
//
const initialValues = {
  departDate: addDays(new Date(), 7),
  returnDate: addDays(new Date(), 14),
  oneWay: "oneWay"
}

export class FlightSearchForm extends Component {
  state = {
    oneWayBool: true,
    travCount: 0,
    sharedAirport: {}
    // [each traveler id]: origin/dest airport
  }
  handleSubmit = values => {
    console.log("values", values)
  }
  changeOneWay = bool => {
    this.setState({ oneWayBool: bool })
  }
  addTraveler = ({ userId, airport }) => {
    // console.log("adding", userId, airport)
    // this.setState({
    //   [userId]: airport || true,
    //   travCount: this.state.travCount + 1
    // })
  }
  setAirport = ({ userId, airportCode }) => {
    this.setState({ [userId]: airportCode })
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit} initialValues={initialValues}>
        {({ values, handleSubmit }) => {
          const { travCount, oneWayBool, ...travelers } = this.state
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={8}>
                <Grid item xs={12} container spacing={16}>
                  <Grid item>
                    <DatePicker name="departDate" label="Departure Date" />
                  </Grid>
                  {!this.state.oneWayBool && (
                    <Grid item>
                      <DatePicker name="returnDate" label="Return Date" />
                    </Grid>
                  )}
                  <Grid item>
                    <ReturnTripRadio changeOneWay={this.changeOneWay} />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <TravelersOriginList smart />
                  <AddRemoveTravelers
                    addTraveler={this.addTraveler}
                    addedTravs={this.state}
                  />
                </Grid>
                <Grid item xs={12} style={{ padding: "1rem" }}>
                  <ApolloConsumer>
                    {client => {
                      return (
                        <AirportAutocomplete
                          handleSelectedAirport={commonAirport => {
                            client.writeData({
                              data: {
                                commonAirport
                              }
                            })
                          }}
                        />
                      )
                    }}
                  </ApolloConsumer>
                </Grid>
                {!this.state.oneWayBool && (
                  <Grid item xs={12}>
                    <TravelersOriginList />
                  </Grid>
                )}
                <Grid item xs={12}>
                  action buttons "search"
                </Grid>
                <Grid item xs={12}>
                  {showMe(values)}
                </Grid>
              </Grid>
            </form>
          )
        }}
      </Form>
    )
  }
}

export default FlightSearchForm
