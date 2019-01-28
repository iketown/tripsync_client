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
      returnRides {
        departureTime
        arrivalTime
        duration
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
      rides {
        name
        departureTime
        arrivalTime
        duration
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
