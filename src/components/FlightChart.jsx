import React, { Component } from "react"
import { Bubble } from "react-chartjs-2"
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
import { showMe } from "../helpers/showMe"

const colors = [teal, purple, orange, indigo, brown, blue, red, grey]

function dataPointFromItinerary(itinerary) {
  // this creates a single flight
  const price = itinerary.price
  const arrivalTime = itinerary.rides[itinerary.rides.length - 1].arrivalTime
  return { x: moment(arrivalTime), y: price, r: 5 }
}

function itineraryListDataset({ flights, index }) {
  // these are ALL the flights for this origin.
  const color = colors[index][200]
  const darkColor = colors[index][800]
  return {
    label: "My First dataset",
    fill: false,
    lineTension: 0.1,
    backgroundColor: color,
    borderColor: darkColor,
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointBorderColor: "rgba(75,192,192,1)",
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "rgba(75,192,192,1)",
    pointHoverBorderColor: "rgba(220,220,220,1)",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: flights.map(flight => dataPointFromItinerary(flight))
  }
}

function getDataObject(flights) {
  return {
    labels: ["January", "February", "March"],
    datasets: [
      // each dataset is a list of itineraries - i.e.  a person or origin point.
      // there will be more of these, each one will get color from index
      itineraryListDataset({ flights, index: 0 })
    ]
  }
}

export class FlightChart extends Component {
  render() {
    console.log(this.props.flights.length)
    return (
      <div>
        <h2>Bubble Example</h2>
        <Bubble data={getDataObject(this.props.flights)} />
        {showMe(this.props.flights)}
      </div>
    )
  }
}

export default FlightChart
