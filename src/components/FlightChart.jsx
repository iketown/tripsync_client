import React, { Component } from "react"
import moment from "moment"
import { Bubble } from "react-chartjs-2"
import jsonDataArr from "./dataArrFromSearch.json"
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

window.moment = moment
const colors = [teal, purple, orange, indigo, brown, blue, red, grey]

let earliestFlightArrival = Infinity
let latestFlightArrival = 0

function dataPointFromItinerary({ itinerary, returnTripBool }) {
  // this creates a single flight
  const { price, amadeusID, rides, returnRides, travelers } = itinerary
  const theseRides = returnTripBool ? returnRides : rides
  const arrivalTime = theseRides[theseRides.length - 1].arrivalTime
  if (arrivalTime > latestFlightArrival) latestFlightArrival = arrivalTime
  if (arrivalTime < earliestFlightArrival) earliestFlightArrival = arrivalTime
  if (!arrivalTime) return null
  return { x: new Date(arrivalTime), y: price, r: 5, aid: amadeusID }
}

function itineraryListDataset({ flights, index, returnTripBool }) {
  // these are ALL the flights for this origin.
  const color = colors[index][200]
  const darkColor = colors[index][800]

  return {
    label: returnTripBool ? "return" : "outbound",
    fill: false,
    lineTension: 0.1,
    backgroundColor: color,
    borderColor: darkColor,

    data: flights.map(itinerary =>
      dataPointFromItinerary({ itinerary, returnTripBool })
    )
  }
}

function getDataObject({ flights, returnTripBool }) {
  return {
    labels: ["January", "February", "March"],
    datasets: [itineraryListDataset({ flights, index: 0, returnTripBool })]
  }
}

export class FlightChart extends Component {
  state = {
    currentAid: null
  }
  handleClick(aid) {
    this.setState({ currentAid: aid })
  }
  render() {
    const { returnTripBool } = this.props
    return (
      <div>
        <h2>{returnTripBool ? "Return Trip" : "Outbound"}</h2>
        <Bubble
          onElementsClick={e => {
            console.log(e[0])
            if (!e.length) return null
            const dotIndex = e[0]._index
            const datasetIndex = e[0]._datasetIndex
            this.setState({ datasetIndex, dotIndex })
          }}
          data={getDataObject({
            flights: this.props.flights,
            returnTripBool
          })}
          options={{
            // onClick: function(e) {
            //   const element = this.getElementAtEvent(e)
            //   if (element.length > 0) {
            //     var data = this.config.data.datasets[element[0]._datasetIndex]
            //       .data[element[0]._index]
            //     console.log(data)
            //     console.log("aid", data.aid)
            //     FlightChart.handleClick(data.aid)
            //   }
            // },
            legend: {
              display: true
            },
            // tooltips: {
            //   // enabled: false,
            //   custom: tooltipModel => {}
            // },
            scales: {
              gridLines: {},
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Arriving Time"
                  },

                  type: "linear",
                  ticks: {
                    callback: (value, index, values) => {
                      return moment(value).format("h a")
                    },
                    stepSize: 1000 * 60 * 60
                  }

                  // ticks: {
                  //   source: "data"
                  // }
                  // time: {
                  //   unit: "hour"
                  // }
                }
              ]
            }
          }}
        />
        {showMe(this.props.flights[0])}
      </div>
    )
  }
}

export default FlightChart
