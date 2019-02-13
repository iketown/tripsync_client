import React from "react"
import { Form, Field } from "react-final-form"
import {
  Grid,
  Typography,
  FormControlLabel,
  Button,
  Switch
} from "@material-ui/core"
import { showMe } from "../helpers/showMe"
import addDays from "date-fns/addDays"
import { ApolloConsumer, Mutation, Query } from "react-apollo"
import styled from "styled-components"
//
import DatePicker from "./formComponents/DatePicker.jsx"
import AddRemoveTravelers from "./formComponents/AddRemoveTravelers"
import TravelersOriginList from "./formComponents/TravelersOriginList.jsx"
import AirportAutocomplete from "./formComponents/AirportAutocomplete.jsx"
//

const CenteredElements = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px orange dotted; */
  height: 100%;
`

const initialValues = {
  departDate: addDays(new Date(), 7),
  returnDate: addDays(new Date(), 14),
  roundTrip: false
}

export function FlightSearchForm({ handleSearchFlights }) {
  const handleSubmit = values => {
    handleSearchFlights(values)
  }

  return (
    <Form onSubmit={handleSubmit} initialValues={initialValues}>
      {({ form, values, handleSubmit }) => {
        const { roundTrip } = values
        const columnObjs = [
          {
            title: "Travelers",
            columnComponent: <AddRemoveTravelers />
          },
          { title: "Destination", columnComponent: null },
          {
            title: "Dates",
            columnComponent: (
              <Field
                type="checkbox"
                name="roundTrip"
                render={({ input, meta }) => {
                  return (
                    <FormControlLabel
                      label={roundTrip ? "Round Trip" : "One Way"}
                      labelPlacement="start"
                      control={
                        <Switch
                          // checked={!oneWayBool}
                          // onChange={e => this.changeOneWay(!e.target.checked)}
                          {...input}
                          color="primary"
                        />
                      }
                    />
                  )
                }}
              />
            )
          }
        ]
        return (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={16}>
              {columnObjs.map(({ title, columnComponent }) => (
                <Grid
                  key={title}
                  item
                  xs={6}
                  sm={4}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography component="h4">{title}</Typography>
                  {columnComponent}
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={16}>
              <Grid item xs={6} sm={4} style={{ textAlign: "center" }}>
                <CenteredElements>
                  <TravelersOriginList smart />
                </CenteredElements>
              </Grid>
              <Grid item xs={6} sm={4}>
                <CenteredElements>
                  <ApolloConsumer>
                    {client => {
                      return (
                        <div
                          className="destinationAirport"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <AirportAutocomplete
                            placeholder="Enter Airport"
                            skipConfirmationButton
                            handleSelectedAirport={commonAirport => {
                              form.change(
                                "commonAirport",
                                commonAirport.airportCode
                              )
                              client.writeData({
                                data: {
                                  commonAirport
                                }
                              })
                            }}
                          />
                        </div>
                      )
                    }}
                  </ApolloConsumer>
                </CenteredElements>
              </Grid>
              <Grid item xs={6} sm={4}>
                <CenteredElements>
                  <DatePicker name="departDate" label="Departure Date" />
                  {roundTrip && (
                    <DatePicker name="returnDate" label="Return Date" />
                  )}
                </CenteredElements>
              </Grid>
            </Grid>
            <Grid container spacing={16}>
              <Grid item xs={6} sm={4} style={{ textAlign: "center" }}>
                <AddRemoveTravelers />
              </Grid>
              {/* two empty columns here */}
            </Grid>

            <Grid
              variant={"contained"}
              color="primary"
              item
              xs={12}
              style={{ textAlign: "center" }}
            >
              <Button onClick={handleSubmit}>Search</Button>
            </Grid>
            <Grid item xs={12}>
              {showMe(values)}
            </Grid>
          </form>
        )
      }}
    </Form>
  )
}

export default FlightSearchForm
