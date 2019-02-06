import React, { useState } from "react"
import { Grid, Card, CardContent, Typography } from "@material-ui/core"
import { Query } from "react-apollo"
//
import { showMe } from "../helpers/showMe"
import { MyTravelersFullQ, MyTravelersIds } from "../queries/me.queries"
import UserCard from "../components/UserCard.jsx"
//
//

function MyTravelers() {
  const [section, setSection] = useState("Home")
  return (
    <Query query={MyTravelersIds}>
      {({ loading, error, data }) => {
        if (loading) return "loading. . ."
        if (error) {
          console.log("error is", error.graphQLErrors)
          return "error. . ."
        }
        // const travelers = data && data.me && data.me.adminTravelers
        console.log("MyTravelers data", data)
        return (
          <Grid container spacing={16}>
            {data.myTravelerIds.adminTravelers.map(trav => {
              return (
                <Grid key={trav.id} item xs={12} md={6}>
                  <UserCard userId={trav.id} />
                </Grid>
              )
            })}
          </Grid>
        )
      }}
    </Query>
  )
}

export default MyTravelers
