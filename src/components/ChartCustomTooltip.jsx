import React from "react"
// import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent'
import { Card, CardContent, List, ListItem } from "@material-ui/core"
import { fakeFlightInfo } from "./fakeFlightInfo"

// ChartCustomTooltip shows when you hover over a dot on the grid.
//  if you click on that dot, it will add an ItineraryCard to your PossibleFlightsList
function ChartCustomTooltip(props) {
  const useRealFlightInfo = true
  if (!props.active && useRealFlightInfo) return null
  if (props.active) {
    console.log("tooltip payload", props.payload)
  }
  const flightInfo = useRealFlightInfo
    ? props.payload[0].payload
    : fakeFlightInfo
  const { price, origin, destination, rides } = flightInfo
  return (
    <Card>
      <CardContent>
        <List>
          <ListItem>price: {price}</ListItem>
          <ListItem>origin: {origin}</ListItem>
          <ListItem>destination: {destination}</ListItem>
          {rides.map(ride => (
            <ListItem key={ride.name + ride.arrivalTime}>{ride.name}</ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default ChartCustomTooltip

export function Cursor(props) {
  console.log("cursor props", props)
  return <div>cursor</div>
}
