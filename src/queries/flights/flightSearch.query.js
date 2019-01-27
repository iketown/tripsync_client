import gql from "graphql-tag"

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
      rides {
        name
        origin {
          lat
          lng
          name
          airportCode
        }
        destination {
          lat
          lng
          name
          airportCode
        }
        company {
          name
          iata
        }
      }
    }
  }
`
