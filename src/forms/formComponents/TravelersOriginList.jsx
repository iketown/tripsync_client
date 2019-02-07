import React from "react"
import { Query } from "react-apollo"
import { TRAVELERS_ORIGINS } from "../../queries/flights/flightSearch.query"
import TravelerOriginChip from "./TravelerOriginChip.jsx"
import { Grid } from "@material-ui/core"
function TravelersOriginList({ smart }) {
  return (
    <Query query={TRAVELERS_ORIGINS}>
      {({ loading, error, data: { travelersOrigins } }) => {
        if (loading) return "loading . . ."
        if (error) return "error in Traveler Origin List"
        console.log(
          "travelersOrigins in Traveler Origin List",
          travelersOrigins
        )
        return (
          <Grid container item xs={12}>
            {travelersOrigins.map(travOrig => (
              <TravelerOriginChip
                key={travOrig.userId + "OriginChip"}
                userId={travOrig.userId}
                origin={travOrig.origin}
                // smart boolean gives chip ability to change airports, remove, etc.
                // not smart is just for display
                smart={smart}
              />
            ))}
          </Grid>
        )
      }}
    </Query>
  )
}

export default TravelersOriginList
