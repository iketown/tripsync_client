import gql from "graphql-tag"

import {
  LocationInfoFrag,
  RideInfoFrag,
  BasicUserInfoFrag
} from "../query.fragments"

export const TRAVELERS_ORIGINS = gql`
  query TRAVELERS_ORIGINS {
    travelersOrigins @client {
      id
      origin
    }
  }
`

export const FLIGHT_SEARCH_MUTATION = gql`
  mutation FLIGHT_SEARCH($input: FlightSearchInput!) {
    flightSearchResults: flightSearch(input: $input) {
      amadeusId
      price
      origin
      destination
      travelers {
        ...BasicUserInfo
      }
      returnRides {
        ...RideInfo
      }
      rides {
        ...RideInfo
      }
    }
  }
  ${LocationInfoFrag}
  ${RideInfoFrag}
  ${BasicUserInfoFrag}
`
