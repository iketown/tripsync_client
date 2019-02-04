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
import TravelersList from "./formComponents/TravelersList.jsx"
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
  travelerFilter = trav => !this.state.travelers.includes(trav.id)

  addTraveler = ({ userId, airport }) => {
    console.log("adding", userId, airport)
    this.setState({
      [userId]: airport || true,
      travCount: this.state.travCount + 1
    })
  }
  removeTraveler = userId => {
    this.setState({ [userId]: false, travCount: this.state.travCount - 1 })
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
            <ArcherContainer strokeColor="grey" strokeWidth={1} arrowLength={0}>
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
                    <TravelersList
                      travelerObjs={travelers}
                      removeTraveler={this.removeTraveler}
                      setAirport={this.setAirport}
                    />
                    <AddRemoveTravelers
                      addTraveler={this.addTraveler}
                      addedTravs={this.state}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ padding: "1rem" }}>
                    <ArcherElement
                      id="destinationAirport"
                      style={{ display: "inline-block" }}
                      relations={
                        !oneWayBool
                          ? Object.keys(travelers).map(travId => ({
                              targetId: `userDest${travId}`,
                              targetAnchor: "top",
                              sourceAnchor: "bottom"
                            }))
                          : []
                      }
                    >
                      <ApolloConsumer>
                        {client => {
                          return (
                            <AirportAutocomplete
                              handleSelectedAirport={commonAirport => {
                                console.log("handling Common ap", commonAirport)
                                client.writeData({
                                  data: {
                                    commonAirport: commonAirport
                                  }
                                })
                              }}
                            />
                          )
                        }}
                      </ApolloConsumer>
                    </ArcherElement>
                  </Grid>
                  {!this.state.oneWayBool && (
                    <Grid item xs={12}>
                      <TravelersList
                        travelerObjs={travelers}
                        removeTraveler={this.removeTraveler}
                        setAirport={this.setAirport}
                        dumb
                      />
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
            </ArcherContainer>
          )
        }}
      </Form>
    )
  }
}

export default FlightSearchForm
