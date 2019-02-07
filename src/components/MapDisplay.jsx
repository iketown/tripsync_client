import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { showMe } from "../helpers/showMe"
import { Button } from "@material-ui/core"
import { UserInfoFrag } from "../queries/user.queries"
import { TRAVELERS_ORIGINS } from "../queries/flights/flightSearch.query"
export const AIRPORT_COORDINATES = gql`
  {
    commonAirport @client {
      name
      lat
      lng
    }
  }
`

export const TRAVELERS_QUERY = gql`
  {
    travelers @client {
      userId
      airportCode
    }
  }
`
export const TRAVELERS_INFO = gql`
  query TRAVELERS_INFO($userIds: [ID!]) {
    users(userIds: $userIds) {
      ...UserInfo
    }
  }
  ${UserInfoFrag}
`

// get back my 'adminLoc' version of this airport.  with notes, etc.
// export const FULL_AIRPORT_QUERY = gql`
//     {

//     }
// `

function MapDisplay() {
  return (
    <>
      <Query query={AIRPORT_COORDINATES}>
        {({ loading, error, data }) => {
          return (
            <div>
              map display
              <div>{showMe(data)}</div>
            </div>
          )
        }}
      </Query>
      <Query query={TRAVELERS_ORIGINS}>
        {({ loading, error, data }) => {
          const { travelers = [] } = data
          return (
            <div>
              map 2<div>{showMe(data)}</div>
              <h5>that feeds this query, more info about travelers:</h5>
              <Query
                query={TRAVELERS_INFO}
                variables={{
                  userIds: travelers.map(trav => trav.userId)
                }}
              >
                {({ loading, error, data: TravData }) => {
                  return (
                    <div>
                      more user info
                      {showMe(data, "travelersOrigins")}
                    </div>
                  )
                }}
              </Query>
            </div>
          )
        }}
      </Query>
    </>
  )
}

export default MapDisplay
