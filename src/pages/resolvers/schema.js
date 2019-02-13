import gql from "graphql-tag"

export const typeDefs = gql`
  extend type Mutation {
    addFoo(price: Int): Foo
    setCommonAirport(commonAirport: String): String
    addTraveler(id: ID!, airportCode: String): Boolean
    removeTraveler(id: ID!): Boolean
    setTravelerAirport(id: ID!, airportCode: String): Traveler
  }
  extend type Query {
    travelers: [Traveler]
    foos(price: Int): [Foo]
  }
  type Traveler {
    id: ID!
    airportCode: String
  }
  type Foo {
    id: ID!
    price: Int
  }
`
