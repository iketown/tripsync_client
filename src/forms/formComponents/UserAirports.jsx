import React from "react"
import { Mutation, Query } from "react-apollo"
import {
  UpdateAdminLoc,
  AddFreqAirport,
  RemoveFreqAirport,
  FullUserInfoQuery
} from "../../queries/user.queries"
import { MyTravelersFullQ } from "../../queries/me.queries"
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Typography,
  IconButton,
  Card,
  CardMedia
} from "@material-ui/core"
//
import { showMe } from "../../helpers/showMe"
import AirportAutocomplete from "./AirportAutocomplete.jsx"
import { RemoveCircle, RemoveCircleOutline } from "@material-ui/icons"
//
//
function UserAirports({ trav }) {
  const { freqAirports, id: userId } = trav
  return (
    <Grid container spacing={8}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Mutation
          mutation={AddFreqAirport}
          update={(proxy, { data: { newFreqAirport } }) => {
            const data = proxy.readQuery({
              query: FullUserInfoQuery,
              variables: { userId }
            })
            console.log("addairport update data", data)
            console.log("addairport returned newFreqAirport", newFreqAirport)
            data.fullUserInfo.freqAirports.push(newFreqAirport)
            proxy.writeQuery({
              query: FullUserInfoQuery,
              variables: { userId },
              data
            })
          }}
        >
          {(addFreqAirport, { data }) => {
            function handleSelectedAirport({ airportCode }) {
              // prevent duplicates here
              if (
                freqAirports.find(
                  adminLoc => adminLoc.location.airportCode === airportCode
                )
              )
                return false
              const variables = {
                userId: trav.id,
                airportCode
              }
              addFreqAirport({
                variables
              })
            }
            return (
              <AirportAutocomplete
                label="Add Airport"
                handleSelectedAirport={handleSelectedAirport}
              />
            )
          }}
        </Mutation>
      </Grid>
      {freqAirports.map(airport => {
        const { use, id: adminLocId } = airport

        const { airportCode, name, city, state, country } = airport.location
        return (
          <Grid key={adminLocId} item xs={12} lg={6}>
            <Card style={{ display: "flex" }} key={adminLocId}>
              <div
                style={{
                  width: "50px",
                  background: `linear-gradient(
                            to right, 
                            rgba(255, 0, 0, 0) 65%, 
                            rgba(255, 255, 255,0.1) 72%, 
                            rgb(255, 255, 255) 100%
                            ), 
                        url(https://airportcod.es/images/card/${airportCode}.jpg)`,
                  backgroundSize: "cover"
                }}
              />
              <ListItemText
                primary={
                  <div>
                    <span>{airportCode}</span>
                    <Typography inline variant="caption" color="textSecondary">
                      {`  ${city.slice(0, 16)} • ${state || country}`}
                    </Typography>
                  </div>
                }
              />
              <Mutation
                mutation={RemoveFreqAirport}
                variables={{ userId: trav.id, adminLocId }}
                update={proxy => {
                  // read this page's query from cache
                  const data = proxy.readQuery({
                    query: FullUserInfoQuery,
                    variables: { userId: trav.id }
                  })
                  const newFreqAirports = data.fullUserInfo.freqAirports.filter(
                    fap => fap.id !== adminLocId
                  )
                  data.fullUserInfo.freqAirports = newFreqAirports
                  proxy.writeQuery({
                    query: FullUserInfoQuery,
                    variables: { userId: trav.id },
                    data
                  })
                }}
              >
                {remove => {
                  return (
                    <IconButton onClick={remove}>
                      <RemoveCircleOutline color="error" />
                    </IconButton>
                  )
                }}
              </Mutation>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default UserAirports
