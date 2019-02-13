import moment from "moment"

export const cleanupCardInfo = rawInfo => {
  console.log("raw cleanup card info", rawInfo)
  const {
    origin,
    destination,
    id,
    rides,
    travelers,
    firstFlightDepartureTime,
    lastFlightArrivalTime,
    lastFlightArrivalUnix,
    price
  } = rawInfo
  return {
    origin,
    destination,
    id,
    rides,
    travelers,
    firstFlightDepartureTime,
    lastFlightArrivalTime,
    lastFlightArrivalUnix,
    price
  }
}

// pull landing time, price, duration from each flight
export function parseFlightItineraries(flightItineraries) {
  return flightItineraries.map(itin => {
    const firstFlightDepartureTime = itin.rides[0].departureTime
    const lastFlightArrivalTime = itin.rides[itin.rides.length - 1].arrivalTime
    const lastFlightArrivalUnix = moment(lastFlightArrivalTime).format("X")
    return {
      ...itin,
      lastFlightArrivalUnix,
      firstFlightDepartureTime,
      lastFlightArrivalTime
    }
  })
}
