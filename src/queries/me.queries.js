import gql from "graphql-tag"

export const signInQ = `
  query SIGN_IN($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      jwt
    }
  }
`

export const myTravelersQ = gql`
  query MY_TRAVELERS {
    me {
      adminLocs(limit: 30) {
        id
        notes
        location {
          name
          airportCode
        }
      }
      adminTravelers {
        firstName
        lastName
        id
        homeAirports {
          airportCode
          name
          lat
          lng
        }
        photoUrl
        userName
      }
    }
  }
`
