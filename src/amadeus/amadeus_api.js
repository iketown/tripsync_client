import Amadeus from "amadeus"
import { fakeResults } from "./testResponse"
// import airports from "./filteredAirports.json"

const amadeus = new Amadeus({
  clientId: process.env.REACT_APP_AMADEUS_CLIENT_ID,
  clientSecret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET
})

export const parseResults = () => {
  const response = fakeResults // this will switch to rawResult for real calls
  console.log(response)
  console.log(response.data)
  // offer.offerItems.length is always 1
  const parseService = service => {
    const segments = service[0].segments
    return segments
  }
  function parseOffer(offer) {
    const { price, services } = offer.offerItems[0]
    return {
      id: offer.id,
      price,
      segments: parseService(services)
    }
  }
  const parsed = response.data.map(offer => parseOffer(offer))
  return { parsed }
}

export const getFlights = async ({ origin, destination, departureDate }) => {
  const { data } = await amadeus.shopping.flightOffers.get({
    origin,
    destination,
    departureDate,
    currency: "USD"
  })
  //   function parseResult(flight) {
  //     const {price: totalPrice, totalTaxes} = flight.offerItems[0].price
  //     const {segments} = flight.offerItems[0].services[0]

  //     return {
  //         id: flight.id
  //         totalPrice,
  //         totalTaxes,

  //     }
  //   }
  const returnObj = {}
}
