import gql from "graphql-tag"
import {
  BasicUserInfoFrag,
  ItineraryInfoFrag,
  UserInfoFrag
} from "./query.fragments"

export const TRAVELERS_ORIGINS = gql`
  query TRAVELERS_ORIGINS {
    travelersOrigins @client {
      id
      origin
    }
  }
`
export const TRAVELERS_QUERY = gql`
  {
    travelers @client {
      id
      airportCode
    }
  }
`
export const TRAVELERS_INFO = gql`
  query TRAVELERS_INFO($userIds: [ID!]) {
    users(userIds: $userIds) {
      ...BasicUserInfo
    }
  }
  ${BasicUserInfoFrag}
`

export const UPDATE_TRAVELER_ORIGIN = gql`
  mutation UPDATE_TRAVELER_ORIGIN($id: ID!, $airportCode: String) {
    newTO: updateTravelerOrigin(id: $id, airportCode: $airportCode) @client {
      id
      origin
    }
  }
`
export const ADD_TRAVELER_MUT = gql`
  mutation addTraveler($id: ID!, $airportCode: String) {
    addTraveler(id: $id, airportCode: $airportCode) @client
  }
`

export const REMOVE_TRAVELER_MUT = gql`
  mutation removeTraveler($id: ID!) {
    removedTraveler: removeTraveler(id: $id) @client {
      userId
    }
  }
`

export const COMMON_AIRPORT = gql`
  {
    commonAirport @client {
      name
      lat
      lng
    }
  }
`

export const ITINERARIES_BY_ORIGIN = gql`
  query ITINERARIES_BY_ORIGIN($origin: String!) {
    flightItineraries(origin: $origin) @client {
      ...ItineraryInfo
    }
  }
  ${ItineraryInfoFrag}
`

export const ALL_ITINERARIES = gql`
  query ALL_ITINERARIES {
    flightItineraries @client {
      ...ItineraryInfo
    }
  }
  ${ItineraryInfoFrag}
`

export const ADD_ITINERARIES_MUTATION = gql`
  mutation ADD_ITINERARIES($input: ItinerariesInput) {
    addedItineraries: addItineraries(input: $input) @client {
      id
      price
      travelers {
        ...BasicUserInfo
      }
    }
  }
  ${BasicUserInfoFrag}
`
