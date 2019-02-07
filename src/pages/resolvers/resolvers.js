import { TRAVELERS_QUERY } from "../../components/MapDisplay.jsx"
import { TRAVELERS_ORIGINS } from "../../queries/local.queries"
import { myTravelersQ } from "../../queries/me.queries"

//
//

export const resolvers = {
  Mutation: {
    setCommonAirport: (_, { commonAirport }, { cache, getCacheKey }) => {
      //   console.log("commonairport in resolver", commonAirport)
      //   const query = cache.readQuery({ query: TRAVELERS_QUERY })
      //   console.log("query", query)
      // cache.writeQuery({ query: GET_CART_ITEMS, data });
    },
    addTraveler: async (_, { userId, airportCode }, { cache }) => {
      try {
        const data = await cache.readQuery({ query: TRAVELERS_ORIGINS })
        console.log("data in resolver", data.travelersOrigins)
        data.travelersOrigins.push({
          __typename: "travelersOrigins",
          userId,
          origin: airportCode
        })
        cache.writeQuery({ query: TRAVELERS_ORIGINS, data })
      } catch (error) {
        console.error("error in addTraveler resolver", error)
        return false
      }
    },
    removeTraveler: async (_, { userId }, { cache }) => {
      const data = await cache.readQuery({ query: TRAVELERS_ORIGINS })
      const newTravOrigins = data.travelersOrigins.filter(
        travOrig => travOrig.userId !== userId
      )
      data.travelersOrigins = newTravOrigins
      cache.writeQuery({
        query: TRAVELERS_ORIGINS,
        data
      })
      return { userId }
    },
    updateTravelerOrigin: async (_, { userId, airportCode }, { cache }) => {
      const data = await cache.readQuery({
        query: TRAVELERS_ORIGINS
      })
      const newTravOrigins = data.travelersOrigins.map(travOrig => {
        if (travOrig.userId === userId)
          return { ...travOrig, origin: airportCode }
        return travOrig
      })
      data.travelersOrigins = newTravOrigins
      cache.writeQuery({
        query: TRAVELERS_ORIGINS,
        data
      })
      return { userId, origin: airportCode }
    }
  },
  Query: {
    traveler: async (_, { userId }, { cache }) => {
      console.log("traveler called with", userId)
      const { travelers } = await cache.readQuery({ query: TRAVELERS_QUERY })
      const traveler = travelers.find(t => t.userId === userId)
      console.log("found traveler:", traveler)
      return traveler
    }
  },
  Traveler: {
    user: (traveler, args, { cache }) => {
      const response = cache.readQuery({ query: myTravelersQ })
      console.log("traveler resolver response", response)
    }
  }
}
