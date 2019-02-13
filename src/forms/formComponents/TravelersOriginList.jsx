import React from "react"
import { Query } from "react-apollo"
import { TRAVELERS_ORIGINS } from "../../queries/flights/flightSearch.query"
import TravelerOriginChip from "./TravelerOriginChip.jsx"
import { Grid } from "@material-ui/core"
import LineTo from "react-lineto"

function TravelersOriginList({ smart }) {
  return (
    <Query query={TRAVELERS_ORIGINS}>
      {({ loading, error, data }) => {
        if (loading) return "loading . . ."
        if (error) return "error in Traveler Origin List"
        return data.travelersOrigins.map((travOrig, i) => (
          <TravelerOriginChip
            first={i === 0}
            key={travOrig.id + "OriginChip"}
            userId={travOrig.id}
            origin={travOrig.origin}
            // smart boolean gives chip ability to change airports, remove, etc.
            // not smart is just for display
            smart={smart}
          />
        ))
      }}
    </Query>
  )
}

export default TravelersOriginList
