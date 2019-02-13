import React, { useState } from "react"
// import dataArr from "./dataArrFromSearch.json"

import { Chip, Grid } from "@material-ui/core"
import {
  ScatterChart,
  Legend,
  Tooltip,
  Scatter,
  CartesianGrid,
  YAxis,
  XAxis,
  ZAxis,
  Label
} from "recharts"
import { Card, CardContent, CardActions, Avatar } from "@material-ui/core"
import { Person } from "@material-ui/icons"
import moment from "moment"
import {
  red,
  purple,
  indigo,
  blue,
  teal,
  orange,
  brown,
  grey
} from "@material-ui/core/colors"
//
import ChartCustomTooltip, { Cursor } from "./ChartCustomTooltip.jsx"
import {
  cleanupCardInfo,
  parseFlightItineraries
} from "./FlightChartHelpers.jsx"
import ChartLegend from "./ChartLegend"
import ChartTimeSlider from "./ChartTimeSlider.jsx"
import ChartItineraryCard from "./ChartItineraryCard.jsx"
//
window.moment = moment
//
//
const materialColors = [orange, indigo, teal, purple, brown, blue, red, grey]

export function FlightChartContainer({ flightsByOrigin }) {
  if (!flightsByOrigin) return null
  console.log("creating scatters")
  const scatters = Object.entries(flightsByOrigin).map(
    ([origin, flights], i) => {
      return {
        origin,
        flightItineraries: parseFlightItineraries(flights),
        shades: materialColors[i % materialColors.length]
      }
    }
  )
  return <FlightChart2 scatters={scatters} />
}

function FlightChart2({ scatters }) {
  const [selectedOrigins, setSelectedOrigins] = useState([])
  const [itinCardInfoArr, setItinCardInfoArr] = useState([])

  function addItinCardInfo(nodeInfo, shades) {
    const foundItin = itinCardInfoArr.find(info => info.id === nodeInfo.id)
    if (foundItin) {
      console.log("already got that one")
      return null
    }
    const cardInfo = { ...cleanupCardInfo(nodeInfo), shades }
    setItinCardInfoArr([...itinCardInfoArr, cardInfo])
  }
  function removeItinCardInfo() {
    // TODO - remove cards from list
  }

  function toggleSelectedOrigin(origin) {
    if (selectedOrigins.includes(origin)) {
      setSelectedOrigins(selectedOrigins.filter(o => o !== origin))
    } else {
      setSelectedOrigins([...selectedOrigins, origin])
    }
  }

  const timeOffset = 60 * 60
  const priceOffset = 10
  const chartCard = (
    <Card>
      <CardContent>
        <ScatterChart width={700} height={400}>
          <XAxis
            dataKey="lastFlightArrivalUnix"
            type="number"
            domain={[`dataMin - ${timeOffset}`, `dataMax + ${timeOffset}`]}
          />
          <YAxis
            dataKey="price"
            domain={[`dataMin - ${priceOffset}`, `dataMax + ${priceOffset}`]}
          />
          <ZAxis dataKey="totalDuration" />
          <Legend
            verticalAlign="top"
            content={props => (
              <ChartLegend
                props={props}
                toggleSelectedOrigin={toggleSelectedOrigin}
              />
            )}
          />
          <Tooltip content={<ChartCustomTooltip />} />
          <CartesianGrid />
          {scatters.map((scatter, i) => {
            return (
              <Scatter
                style={{
                  opacity: selectedOrigins.includes(scatter.origin) ? "1" : ".6"
                }}
                key={scatter.origin}
                name={scatter.origin}
                data={scatter.flightItineraries}
                //   legendType="diamond"
                //   shape="star"
                onClick={
                  nodeInfo => {
                    addItinCardInfo(nodeInfo, scatter.shades)
                  }
                  // scatter.shades is avail
                }
                fill={scatter.shades[200]}
              />
            )
          })}
        </ScatterChart>
      </CardContent>
      <CardActions>
        <ChartTimeSlider />
      </CardActions>
    </Card>
  )
  return (
    <div>
      <h3>Flight Chart 2</h3>
      <Grid container>
        <Grid item xs={8}>
          {chartCard}
        </Grid>
        <Grid item xs={4}>
          {itinCardInfoArr.map((cardInfo, i) => {
            console.log("cardInfo", cardInfo)
            return (
              <ChartItineraryCard key={cardInfo.id + i} cardInfo={cardInfo} />
            )
          })}
          <ChartCustomTooltip />
        </Grid>
      </Grid>
    </div>
  )
}

export default FlightChart2
