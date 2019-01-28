import React from "react"
import { Typography } from "@material-ui/core"
import { ArrowForward } from "@material-ui/icons"
import format from "date-fns/format"
import styled from "styled-components"
//
import { getDuration } from "../../helpers/timeParsers"
import { formatDuration } from "./formats"
const AirportStyle = styled.span`
  /* font-family: "Roboto Mono", monospace; */
  font-weight: bolder;
`
function RideLine({ ride }) {
  const fromAP = ride.origin.airportCode
  const toAP = ride.destination.airportCode

  function timeFormat(string) {
    return format(string, "h:mm a")
  }
  const depTime = timeFormat(ride.departureTime)
  const arrTime = timeFormat(ride.arrivalTime)
  const { hrs, mins } = getDuration(ride.duration)
  return (
    <>
      <Typography variant="button">
        <AirportStyle>{fromAP}</AirportStyle>
      </Typography>
      <Typography>
        <span>{depTime}</span>
      </Typography>
      <ArrowForward style={{ fontSize: "12px", color: "#6b6b6b" }} />
      <Typography variant="button">
        <AirportStyle>{toAP}</AirportStyle>
      </Typography>
      <Typography>
        <span>{arrTime}</span>
      </Typography>
      <Typography style={{ justifySelf: "end", gridColumn: "-1" }}>
        {formatDuration({ hrs, mins })}
      </Typography>
    </>
  )
}

export default RideLine
