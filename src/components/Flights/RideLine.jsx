import React from "react"
import { Typography } from "@material-ui/core"
function RideLine({ ride }) {
  const fromAP = ride.origin.airportCode
  const toAP = ride.destination.airportCode
  return <Typography>{`${fromAP} - ${toAP}`}</Typography>
}

export default RideLine
