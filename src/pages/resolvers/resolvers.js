import {
  TRAVELERS_ORIGINS,
  ALL_ITINERARIES,
  TRAVELERS_QUERY
} from "../../queries/local.queries"
import { myTravelersQ } from "../../queries/me.queries"
import { FOOS_QUERY, FAKE_BAR_QUERY } from "../Tests4.jsx"
//
//

export const resolvers = {
  Mutation: {
    toggleBar: (_, args, { cache }) => {
      console.log("toggleBar args", args)
      const data = cache.readQuery({ query: FAKE_BAR_QUERY })
      data.bar.isCool = !data.bar.isCool
      cache.writeQuery({ query: FAKE_BAR_QUERY, data })
      console.log("data in bar", data)
    },
    addItineraries: (_, args, { cache }) => {
      // give each itinerary an "id" which can just be the same as the amadeusId - for local tracking.   apollo wants a __typename and an id
      // console.log("addItineraries called with", args)
      const { flightSearchResults } = args.input.data
      const data = cache.readQuery({ query: ALL_ITINERARIES })
      const newFlightItineraries = flightSearchResults.map(itin => ({
        ...itin,
        id: itin.amadeusId
      }))
      // adding to cache in two ways here, first as big array
      data.flightItineraries = [
        ...data.flightItineraries,
        ...newFlightItineraries
      ]
      cache.writeQuery({
        query: ALL_ITINERARIES,
        data
      })
      // now read it to make sure its in there right.  you can delet this part
      const allItinsAfter = cache.readQuery({
        query: ALL_ITINERARIES
      })
      console.log("allItinsAfter", allItinsAfter)
      return data.flightItineraries
    },
    addFoo: (_, args, { cache }) => {
      console.log("args in resolver", args)
      const data = cache.readQuery({
        query: FOOS_QUERY
      })
      console.log("data in addFoo resolver", data)
      const newFoo = {
        __typename: "Foo",
        price: args.price,
        id: Math.random(),
        name: "Foofoo"
      }
      data.foos.push(newFoo)
      cache.writeQuery({
        query: FOOS_QUERY,
        data
      })
      return newFoo
    },
    setCommonAirport: (_, { commonAirport }, { cache, getCacheKey }) => {
      //   console.log("commonairport in resolver", commonAirport)
      //   const query = cache.readQuery({ query: TRAVELERS_QUERY })
      //   console.log("query", query)
      // cache.writeQuery({ query: GET_CART_ITEMS, data });
    },
    addTraveler: async (_, { id, airportCode }, { cache }) => {
      try {
        const data = await cache.readQuery({ query: TRAVELERS_ORIGINS })
        console.log("data in resolver", data.travelersOrigins)
        data.travelersOrigins.push({
          __typename: "travelersOrigins",
          id,
          origin: airportCode
        })
        cache.writeQuery({ query: TRAVELERS_ORIGINS, data })
      } catch (error) {
        console.error("error in addTraveler resolver", error)
        return false
      }
    },
    removeTraveler: async (_, { id }, { cache }) => {
      const data = await cache.readQuery({ query: TRAVELERS_ORIGINS })
      const newTravOrigins = data.travelersOrigins.filter(
        travOrig => travOrig.id !== id
      )
      data.travelersOrigins = newTravOrigins
      cache.writeQuery({
        query: TRAVELERS_ORIGINS,
        data
      })
      return { id }
    },
    updateTravelerOrigin: async (_, { id, airportCode }, { cache }) => {
      const data = await cache.readQuery({
        query: TRAVELERS_ORIGINS
      })
      console.log("data in updateTravelerOrigin", data)
      console.log("airportCode in updateTravelerOrigin", airportCode)
      console.log("id in updateTravelerOrigin", id)
      const newTravOrigins = data.travelersOrigins.map(travOrig => {
        if (travOrig.id === id) return { ...travOrig, origin: airportCode }
        return travOrig
      })
      data.travelersOrigins = newTravOrigins
      cache.writeQuery({
        query: TRAVELERS_ORIGINS,
        data
      })
      return { id, origin: airportCode }
    }
  },
  Query: {
    travelersOrigins: (_, args, { cache }) => {
      const data = cache.readQuery({ query: TRAVELERS_ORIGINS })
      return data.travelersOrigin
    },
    foos: (_, args, { cache }) => {
      console.log("foos query called w", args)
    },
    singleFoo: (_, args, { cache }) => {
      console.log("singleFoo called w", args)
      const data = cache.readQuery({ query: FOOS_QUERY })
      console.log("data in singleFoo resolver", data)
      return data.foos.find(foo => foo.price == args.price)
    },
    traveler: async (_, { id }, { cache }) => {
      const { travelers } = await cache.readQuery({ query: TRAVELERS_QUERY })
      const traveler = travelers.find(t => t.id === id)
      return traveler
    },
    flightItineraries: (_, { origin }, { cache }) => {
      // const allData = cache.readData()
      const data = cache.readQuery({ query: ALL_ITINERARIES })
      const ItinsToReturn = data.flightItineraries.filter(itin => {
        // more filters could be applied here.  maybe handle and/or in the args too.
        if (origin) return itin.origin === origin
        // if no filter, return all
        return true
      })
      return ItinsToReturn
    }
  },
  Traveler: {
    user: (traveler, args, { cache }) => {
      const response = cache.readQuery({ query: myTravelersQ })
      console.log("traveler resolver response", response)
    }
  }
}
