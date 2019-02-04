import gql from "graphql-tag"

export const typeDefs = gql`
  extend type Mutation {
    setCommonAirport(commonAirport: String): String
    addTraveler(userId: ID!, airportCode: String): Boolean
    removeTraveler(userId: ID!): Boolean
    setTravelerAirport(userId: ID!, airportCode: String): Traveler
  }
  extend type Query {
    travelers: [Traveler]
  }
  type Traveler {
    userId: ID!
    airportCode: String
  }
`
