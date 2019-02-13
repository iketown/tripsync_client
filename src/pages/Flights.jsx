import React, { useState } from "react"
import { Grid } from "@material-ui/core"
import FlightSearchForm from "../forms/FlightSearchForm"
import MapDisplay from "../components/MapDisplay.jsx"
import { Mutation } from "react-apollo"
import { FLIGHT_SEARCH_MUTATION } from "../queries/flights/flightSearch.query"
import {
  TRAVELERS_ORIGINS,
  COMMON_AIRPORT,
  ADD_ITINERARIES_MUTATION,
  ITINERARIES_BY_ORIGIN
} from "../queries/local.queries"
import { useQuery, useMutation } from "react-apollo-hooks"
import moment from "moment"
//
import FlightSearchDialog from "../components/FlightSearchDialog.jsx"
import FlightSearchResults from "../components/FlightSearchResults"
import FlightChart2 from "../components/FlightChart2"
//
//

export function Flights() {
  const {
    data: { travelersOrigins },
    error,
    loading: originsLoading
  } = useQuery(TRAVELERS_ORIGINS, { suspend: false })
  const flightSearchMutation = useMutation(FLIGHT_SEARCH_MUTATION)
  const addItinerariesMutation = useMutation(ADD_ITINERARIES_MUTATION)
  async function handleSearchFlights(values) {
    if (!values.roundTrip) delete values.returnDate
    const { commonAirport, departDate, returnDate } = values
    setSearchDialogOpen(true)
    const userIdsByOrigin = getUserIdsByOrigin(travelersOrigins, true)
    // each key in userIdsByOrigin will be its own search
    for (let origin in userIdsByOrigin) {
      const variables = {
        input: {
          travelerIds: userIdsByOrigin[origin],
          origin,
          destination: commonAirport,
          departDate: moment(departDate).format("YYYY-MM-DD"),
          returnDate: returnDate && moment(returnDate).format("YYYY-MM-DD"),
          currency: "USD"
        }
      }
      setSearchingText(`Searching ${origin} - ${commonAirport}`)
      const flightSearchResults = await flightSearchMutation({
        variables
      })
      console.log(`flightSearchResults for ${origin}`, flightSearchResults)
      const addItinResults = await addItinerariesMutation({
        variables: { input: flightSearchResults, origin },
        refetchQueries: [
          { query: ITINERARIES_BY_ORIGIN, variables: { origin } }
        ]
      })
      console.log(`add itin results for ${origin}`)
    }
    setSearchDialogOpen(false)
  }

  // perform these searches one at a time, otherwise get an error from amadeus server
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [searchingText, setSearchingText] = useState("")
  function handleCloseDialog() {
    setSearchDialogOpen(false)
  }
  return (
    <Grid container spacing={8}>
      <Grid item xs={12} md={8}>
        <FlightSearchForm handleSearchFlights={handleSearchFlights} />
        <FlightSearchDialog
          open={searchDialogOpen}
          handleClose={handleCloseDialog}
          searchingText={searchingText}
        />
        {/* <ItinerariesChart /> */}
      </Grid>
      <Grid item xs={12} md={4}>
        <FlightSearchResults />
        {/* <MapDisplay /> */}
      </Grid>
    </Grid>
  )
}

export function getUserIdsByOrigin(travelersOrigins, showIt) {
  const userIdsByOrigin = travelersOrigins.reduce((obj, travOrig) => {
    if (obj[travOrig.origin]) {
      obj[travOrig.origin].push(travOrig.id)
    } else {
      obj[travOrig.origin] = [travOrig.id]
    }
    return obj
  }, {})
  if (showIt) {
    console.log("userIdsByOrigin", userIdsByOrigin)
  }
  return userIdsByOrigin
}

export default Flights
