import gql from "graphql-tag"

const locationInfoFragment = gql`
  fragment LocationInfo on Location {
    lat
    lng
    name
    airportCode
  }
`

const ridesInfoFragment = gql`
  fragment RidesInfo on Ride {
    name
    departureTime
    arrivalTime
    duration
    company {
      name
      iata
    }
    origin {
      ...LocationInfo
    }
    destination {
      ...LocationInfo
    }
  }
  ${locationInfoFragment}
`

export const flightSearchQ = gql`
  query FLIGHT_SEARCH($input: FlightSearchInput!) {
    flightSearch(input: $input) {
      amadeusID
      price
      travelers {
        firstName
        lastName
        id
        userName
      }
      returnRides {
        ...RidesInfo
      }
      rides {
        ...RidesInfo
      }
    }
  }
  ${locationInfoFragment}
  ${ridesInfoFragment}
`

export function flightSearchQConstructor({ searchAlias, inputName }) {
  return `
  query FLIGHT_SEARCH($${inputName}: FlightSearchInput!) {
    ${searchAlias} : flightSearch(input: $${inputName}) {
      amadeusID
      price
      travelers {
        firstName
        lastName
        id
        userName
      }
      returnRides {
        ...RidesInfo
      }
      rides {
        ...RidesInfo
      }
    }
  }
  ${locationInfoFragment}
  ${ridesInfoFragment}
`
}
