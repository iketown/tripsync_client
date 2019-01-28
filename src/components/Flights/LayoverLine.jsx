import React from "react"
import styled from "styled-components"
import moment from "moment"
import { Typography } from "@material-ui/core"
//
import { formatDuration } from "./formats"
const LayoverText = styled(Typography)`
  grid-column: 1 / -2;
  justify-self: end;
  font-weight: lighter;
  font-size: smaller;
  small {
    color: gainsboro;
  }
`

function LayoverLine({ ride, prevRide }) {
  if (!prevRide) return null
  const arrivalTime = moment(prevRide.arrivalTime)
  const departureTime = moment(ride.departureTime)
  const seconds = departureTime.diff(arrivalTime, "seconds")
  const difference = moment.duration(seconds, "seconds")
  const mins = difference.minutes()
  const hrs = difference.hours()
  return (
    <>
      <LayoverText>
        <small>{prevRide.destination.name}:</small>
      </LayoverText>
      <Typography style={{ gridColumn: "-1", justifySelf: "end" }}>
        {formatDuration({ hrs, mins })}
      </Typography>
    </>
  )
}

export default LayoverLine
