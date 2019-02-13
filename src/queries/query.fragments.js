import gql from "graphql-tag"

// USERS
export const BasicUserInfoFrag = gql`
  fragment BasicUserInfo on User {
    id
    firstName
    lastName
    photoUrl
  }
`

// LOCATIONS
export const LocationInfoFrag = gql`
  fragment LocationInfo on Location {
    id
    lat
    lng
    city
    state
    country
    name
    airportCode
  }
`

// COMPANY
export const CompanyInfoFrag = gql`
  fragment CompanyInfo on Company {
    name
    iata
    airlineCode
    name2
  }
`

// RIDES
export const RideInfoFrag = gql`
  fragment RideInfo on Ride {
    name
    departureTime
    arrivalTime
    company {
      ...CompanyInfo
    }
    origin {
      ...LocationInfo
    }
    destination {
      ...LocationInfo
    }
  }
  ${LocationInfoFrag}
  ${CompanyInfoFrag}
`

// ITINERARIES
export const ItineraryInfoFrag = gql`
  fragment ItineraryInfo on Itinerary {
    id
    origin
    destination
    price
    travelers {
      ...BasicUserInfo
    }
    rides {
      ...RideInfo
    }
    returnRides {
      ...RideInfo
    }
  }
  ${BasicUserInfoFrag}
  ${RideInfoFrag}
`
