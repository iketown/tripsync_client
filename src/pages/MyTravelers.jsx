import React, { useState } from "react"
import { Grid, Card, CardContent, Typography } from "@material-ui/core"
import { Query } from "react-apollo"
//
import { showMe } from "../helpers/showMe"
import { MyTravelersFullQ } from "../queries/me.queries"
import UserCard from "../components/UserCard.jsx"
//
//

function MyTravelers() {
  const [section, setSection] = useState("Home")
  return (
    <Query query={MyTravelersFullQ}>
      {({ loading, error, data }) => {
        if (loading) return "loading. . ."
        if (error) return "error. . ."
        const travelers = data && data.me && data.me.adminTravelers
        console.log("my travelers", travelers)
        return (
          <Grid container spacing={8}>
            {travelers.map(trav => {
              return (
                <Grid key={trav.id} item xs={12}>
                  <UserCard trav={trav} />
                  {showMe(trav)}
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
