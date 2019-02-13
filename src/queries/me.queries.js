import gql from "graphql-tag"
import { AddressInfoFrag, UserInfoFrag, AdminLocInfoFrag } from "./user.queries"
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
        ...AdminLocInfo
      }
    }
  }
  ${AdminLocInfoFrag}
`

export const myTravelersQ = gql`
  query MY_TRAVELERS {
    me {
      adminTravelers {
        firstName
        lastName
        id
        freqAirports {
          ...AdminLocInfo
        }
        photoUrl
        userName
      }
    }
    travelersOrigins @client {
      id
      origin
    }
  }
  ${AdminLocInfoFrag}
`

export const MyTravelersIds = gql`
  query MY_TRAVELERS_IDS {
    myTravelersIds: me {
      adminTravelers {
        id
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
