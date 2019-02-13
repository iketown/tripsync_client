import React, { Suspense } from "react"
import { Query } from "react-apollo"
import { Button } from "@material-ui/core"
//
import { showMe } from "../helpers/showMe"
import { getUserIdsByOrigin } from "../pages/Flights.jsx"
import {
  ITINERARIES_BY_ORIGIN,
  ALL_ITINERARIES,
  TRAVELERS_ORIGINS
} from "../queries/local.queries"
import { useQuery } from "react-apollo-hooks"
import fakeAllItineraries from "./fakeAllItineraries.json"
import { FlightChartContainer } from "./FlightChart2.jsx"
//
//
// 👇👇👇👇👇👇👇👇👇👇👇👇👇👇
const realData = false
// 👆👆👆👆👆👆👆👆👆👆👆👆👆👆

function FlightSearchResults() {
  const rawData = realData
    ? useQuery(ALL_ITINERARIES, { suspend: false })
    : fakeAllItineraries

  const {
    data: flightsData,
    error: flightError,
    loading: flightLoading
  } = rawData

  if (flightLoading) return "loading . . ."
  if (flightError) {
    console.log(flightError)
    return "error"
  }
  const { flightItineraries = [] } = flightsData
  const flightsByOrigin = flightItineraries.reduce((obj, flight) => {
    obj[flight.origin]
      ? obj[flight.origin].push(flight)
      : (obj[flight.origin] = [flight])
    return obj
  }, {})

  return (
    <div>
      <h4>All Itins</h4>
      <FlightChartContainer flightsByOrigin={flightsByOrigin} />
      <div>{showMe(rawData, "rawData")}</div>
    </div>
  )
}

export default FlightSearchResults
