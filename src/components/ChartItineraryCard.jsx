import React, { Fragment } from "react"
import styled from "styled-components"
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  Typography,
  CardHeader
} from "@material-ui/core"
import { grey } from "@material-ui/core/colors"
import { ArrowRight } from "@material-ui/icons"
import moment from "moment"
import {
  formattedDuration,
  displayAirportTime
} from "./ChartItineraryCard.helpers"
//
//
const RideLinesDiv = styled.div`
  display: grid;
  grid-template-columns:
    [logo] max-content [dep] max-content
    [arrow] max-content [arr] max-content [spacer] 2fr [dur] max-content [endCol];
  width: 100%;
  justify-content: center;
  align-items: center;
`

const greyGradient = `linear-gradient(to left, ${grey[200]}, #fff 70%)`

function RideLine({ ride }) {
  const {
    departureTime,
    arrivalTime,
    company,
    name: flightNum,
    origin,
    destination
  } = ride

  const { iata, name: companyName, name2 } = company

  const photoUrl = `https://images.kiwi.com/airlines/64/${iata}.png`
  const duration = moment.duration(
    moment(arrivalTime).diff(moment(departureTime))
  )
  return (
    <>
      <Avatar
        style={{ gridColumnStart: "logo", justifySelf: "center" }}
        src={photoUrl}
      />
      {displayAirportTime(origin.airportCode, departureTime, "dep")}
      <ArrowRight style={{ gridColumnStart: "arrow" }} />
      {displayAirportTime(destination.airportCode, arrivalTime, "arr")}
      {formattedDuration(duration)}
    </>
  )
}

function LayoverLine({ prevRide, nextRide }) {
  if (!prevRide || !nextRide) console.log("hmm. something wrong")
  const duration = moment.duration(
    moment(nextRide.departureTime).diff(prevRide.arrivalTime)
  )
  console.log(duration.hours(), "hours")
  console.log(duration.minutes(), "minutes")
  const locationText =
    prevRide.destination.city || prevRide.destination.airportCode
  return (
    <>
      <Typography
        variant="caption"
        color="textSecondary"
        style={{
          gridColumn: "logo / dur",
          textAlign: "right",
          background: greyGradient
        }}
      >
        layover{locationText && ` in ${locationText}`}
      </Typography>
      {formattedDuration(duration)}
    </>
  )
}

function ChartItineraryCard({ cardInfo }) {
  const {
    rides,
    shades,
    travelers,
    firstFlightDepartureTime,
    lastFlightArrivalTime
  } = cardInfo
  const totalDuration = moment.duration(
    moment(lastFlightArrivalTime).diff(firstFlightDepartureTime)
  )

  const travelersText = travelers
    .map((trav, i) => {
      const name = trav.firstName || trav.lastName
      return name
    })
    .join(" • ")
  return (
    <Card style={{ border: `1px solid ${shades[200]}`, marginTop: "5px" }}>
      <CardContent style={{ padding: "10px" }}>
        <RideLinesDiv>
          {rides.map((ride, i) => (
            <Fragment key={`${ride.id} ${i}`}>
              {i > 0 && <LayoverLine prevRide={rides[i - 1]} nextRide={ride} />}
              <RideLine key={ride.name + ride.departureTime} ride={ride} />
            </Fragment>
          ))}
          <Typography variant="subtitle2" style={{ gridColumn: "logo " }}>
            ${cardInfo.price}
          </Typography>
          <Typography
            variant="overline"
            style={{ gridColumn: "dep / dur", textAlign: "center" }}
          >
            {travelersText}
          </Typography>
          <div
            style={{
              background: greyGradient
            }}
          >
            {formattedDuration(totalDuration)}
          </div>
        </RideLinesDiv>
      </CardContent>
    </Card>
  )
}

export default ChartItineraryCard
