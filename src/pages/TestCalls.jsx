import React, { Component } from "react"
import { Grid, Button } from "@material-ui/core"
import { Query } from "react-apollo"
//
import FlightSearchForm from "../forms/FlightSearchForm.jsx"
import { flightSearchQ } from "../queries/flights/flightSearch.query"
import { getTime } from "date-fns"
//
import FlightCard from "../components/Flights/FlightCard.jsx"
import { showMe } from "../helpers/showMe"
import {
  fakeFSResponse,
  fakeUserIds
} from "../helpers/fakeFlightSearchResponse"
export class TestCalls extends Component {
  state = {
    input: null,
    fakeResponse: true
  }
  onSubmit = values => {
    const { origin, destination, departDate, returnDate, oneWay } = values
    console.log(origin, destination, departDate, returnDate, oneWay)
    const departDateFormatted = Number(getTime(departDate)).toString()
    const returnDateFormatted = Number(getTime(returnDate)).toString()
    const input = {
      origin,
      destination,
      departDate: departDateFormatted,
      returnDate: oneWay === "roundTrip" ? returnDateFormatted : null,
      travelerIds: [fakeUserIds.brian, fakeUserIds.chaye]
    }
    this.setState({ input })
  }
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={4}>
            <FlightSearchForm onSubmit={this.onSubmit} />
          </Grid>
          <Query
            query={flightSearchQ}
            variables={{ input: this.state.input }}
            skip={!this.state.input}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>loading...</p>
              if (error) return <p>ERROR!! {error.message}</p>
              data = this.state.fakeResponse ? fakeFSResponse : data
              return (
                <Grid container item xs={12} md={8}>
                  {this.state.fakeResponse && <h3>Fake Results</h3>}
                  {data && (
                    <div>
                      {data.flightSearch && (
                        <>
                          <Grid container item xs={12} spacing={8}>
                            {data.flightSearch.map(flight => (
                              <Grid item xs={6}>
                                <FlightCard flight={flight} />
                              </Grid>
                            ))}
                          </Grid>
                          <Grid item xs={12}>
                            <h3>All data</h3>
                            {showMe(data)}
                          </Grid>
                        </>
                      )}
                    </div>
                  )}
                </Grid>
              )
            }}
          </Query>
        </Grid>

        <pre>{this.state.results}</pre>
      </div>
    )
  }
}

export default TestCalls
