import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import moment from "moment"
//
import { formatDuration } from "./formats"

const TotalText = styled.div`
  grid-column: 1 / -2;
  justify-self: end;
`
const TotalTime = styled.div`
  grid-column: -1;
`

function TotalLine({ rides }) {
  const start = moment(rides[0].departureTime)
  const end = moment(rides[rides.length - 1].arrivalTime)
  const duration = moment.duration(end.diff(start))
  const hrs = duration.hours()
  const mins = duration.minutes()
  return (
    <>
      <TotalText>
        <Typography>
          <small>total travel time:</small>
        </Typography>
      </TotalText>
      <TotalTime>
        <Typography>{formatDuration({ hrs, mins })}</Typography>
      </TotalTime>
    </>
  )
}

export default TotalLine
