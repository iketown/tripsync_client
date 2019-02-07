import gql from "graphql-tag"

export const TRAVELERS_ORIGINS = gql`
  query TRAVELERS_ORIGINS {
    travelersOrigins @client {
      userId
      origin
    }
  }
`

export const UPDATE_TRAVELER_ORIGIN = gql`
  mutation UPDATE_TRAVELER_ORIGIN($userId: ID!, $airportCode: String) {
    newTO: updateTravelerOrigin(userId: $userId, airportCode: $airportCode)
      @client {
      userId
      origin
    }
  }
`
export const ADD_TRAVELER_MUT = gql`
  mutation addTraveler($userId: ID!, $airportCode: String) {
    addTraveler(userId: $userId, airportCode: $airportCode) @client
  }
`

export const REMOVE_TRAVELER_MUT = gql`
  mutation removeTraveler($userId: ID!) {
    removedTraveler: removeTraveler(userId: $userId) @client {
      userId
    }
  }
`
