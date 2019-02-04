import gql from "graphql-tag"
import { AddressInfoFrag, UserInfoFrag } from "./user.queries"
export const signInQ = `
  query SIGN_IN($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      jwt
    }
  }
`

export const myLocsQ = gql`
  query MY_LOCS {
    me {
      adminLocs(limit: 30) {
        id
        notes
        location {
          name
          airportCode
          lat
          lng
        }
      }
    }
  }
`

export const myTravelersQ = gql`
  query MY_TRAVELERS {
    me {
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

export const MyTravelersFullQ = gql`
  query MY_TRAVELERS_FULL_Q {
    me {
      adminTravelers {
        ...UserInfo
      }
    }
  }
  ${AddressInfoFrag}
  ${UserInfoFrag}
`
