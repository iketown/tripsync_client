import { TRAVELERS_QUERY } from "../../components/MapDisplay.jsx"
import { myTravelersQ } from "../../queries/me.queries"
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
        const { travelers } = await cache.readQuery({ query: TRAVELERS_QUERY })
        const newTravelers = [
          ...travelers,
          {
            __typename: "Traveler",
            userId,
            airportCode
          }
        ]
        await cache.writeQuery({
          query: TRAVELERS_QUERY,
          data: { travelers: newTravelers }
        })
        return true
      } catch (error) {
        return false
      }
    },
    removeTraveler: async (_, { userId }, { cache }) => {
      const { travelers } = await cache.readQuery({ query: TRAVELERS_QUERY })
      const newTravelers = travelers.filter(t => t.userId !== userId)
      await cache.writeQuery({
        query: TRAVELERS_QUERY,
        data: { travelers: newTravelers }
      })
    },
    updateTraveler: async (_, { userId, update }, { cache }) => {
      const { travelers } = await cache.readQuery({ query: TRAVELERS_QUERY })
      const thisTravOld = travelers.find(trav => trav.userId === userId)
      const thisTravNew = { ...thisTravOld, ...update }
      const newTravelers = travelers.map(trav => {
        if (trav.userId === userId) return thisTravNew
        return trav
      })
      await cache.writeQuery({
        query: TRAVELERS_QUERY,
        data: { travelers: newTravelers }
      })
      return thisTravNew
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
