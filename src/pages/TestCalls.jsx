import React, { Component } from "react"
import { Grid, Button } from "@material-ui/core"
import { Query, compose } from "react-apollo"
import gql from "graphql-tag"
//
import FlightSearchForm from "../forms/FlightSearchFormOLD.jsx"
import { flightSearchQ } from "../queries/flights/flightSearch.query"
import { getTime } from "date-fns"
//
import FlightCard from "../components/Flights/FlightCard.jsx"
import { showMe } from "../helpers/showMe"
import {
  fakeFSResponse,
  fakeUserIds
} from "../helpers/fakeFlightSearchResponse"
import FlightChart from "../components/FlightChart.jsx"
export class TestCalls extends Component {
  state = {
    input: null,
    fakeResponse: false,
    ready: false,
    query: gql`
      {
        whatever {
          what
        }
      }
    `,
    variables: {
      input1: {
        origin: "MSP",
        destination: "MCO",
        departDate: "1549391294510",
        returnDate: "1549996113474",
        travelerIds: ["5c4d999074860b172de01adf"]
      },
      input2: {
        origin: "LAX",
        destination: "MCO",
        departDate: "1549391294510",
        returnDate: "1549996113474",
        travelerIds: ["5c4cbdc01f1be00dce856bdd", "5c4d99aa74860b172de01ae0"]
      }
    }
  }
  onSubmit = values => {
    const {
      origin1,
      origin2,
      origin3,
      origin4,
      destination,
      departDate,
      returnDate,
      oneWay
    } = values
    const departDateFormatted = Number(getTime(departDate)).toString()
    const returnDateFormatted = Number(getTime(returnDate)).toString()
    // [(origin1, origin2, origin3, origin4)].map(origin => {
    //   // create query string from each
    // })
    console.log(origin, destination, departDate, returnDate, oneWay)
    const input = {
      origin: origin1,
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
          <Grid item xs={12} md={3}>
            <FlightSearchForm onSubmit={this.onSubmit} />
          </Grid>
          <Query
            query={this.state.query}
            variables={this.state.variables}
            // skip={!this.state.ready}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>loading...</p>
              if (error) return <p>ERROR!! {error.message}</p>
              data = this.state.fakeResponse ? fakeFSResponse : data
              return (
                <>
                  <Grid container item xs={12} md={9}>
                    {false && (
                      <div>
                        {data.flightSearch && (
                          <>
                            <Grid container item xs={12} spacing={8}>
                              {/* {data.flightSearch.map(flight => (
                                <Grid item xs={6}>
                                  <FlightCard flight={flight} />
                                </Grid>
                              ))} */}
                              <Grid item xs={6}>
                                <FlightChart
                                  flights={data.flightSearch}
                                  returnTripBool={false}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <FlightChart
                                  flights={data.flightSearch}
                                  returnTripBool={true}
                                />
                              </Grid>
                            </Grid>
                          </>
                        )}
                      </div>
                    )}
                  </Grid>
                  {!this.state.fakeResponse && (
                    <Grid container>
                      <Grid item xs={12}>
                        <h3>All data</h3>
                        {showMe(data)}
                      </Grid>
                    </Grid>
                  )}
                </>
              )
            }}
          </Query>
        </Grid>
      </div>
    )
  }
}

export default TestCalls
