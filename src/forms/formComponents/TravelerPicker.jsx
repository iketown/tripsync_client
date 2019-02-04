import React from "react"
import {
  Menu,
  MenuItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider
} from "@material-ui/core"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

const ADD_TRAVELER_MUT = gql`
  mutation addTraveler($userId: ID!, $airportCode: String) {
    addTraveler(userId: $userId, airportCode: $airportCode) @client
  }
`

function TravelerPicker({
  travelers,
  onClose,
  addTraveler,
  anchorEl,
  addedTravs,
  adminLocs
}) {
  if (!travelers) return null
  return (
    <Menu onClose={onClose} anchorEl={anchorEl} open={!!anchorEl}>
      {travelers
        // only show travelers who arent already in the list
        .filter(trav => !addedTravs[trav.id])
        .map(trav => {
          const fullName = `${trav.firstName} ${trav.lastName}`
          const airportCode =
            trav.homeAirports && trav.homeAirports.length
              ? trav.homeAirports[0].airportCode
              : ""
          const homeAirport =
            trav.homeAirports && trav.homeAirports.length
              ? trav.homeAirports[0]
              : {}
          return (
            <Mutation key={trav.id} mutation={ADD_TRAVELER_MUT}>
              {addTravelerApollo => {
                return (
                  <MenuItem
                    onClick={() => {
                      addTraveler({ userId: trav.id, airportCode })
                      addTravelerApollo({
                        variables: {
                          userId: trav.id,
                          airportCode
                        }
                      })
                      onClose()
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={trav.photoUrl} alt={fullName} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={fullName}
                      secondary={airportCode}
                      inset
                    />
                  </MenuItem>
                )
              }}
            </Mutation>
          )
        })}
      <Divider />
      <MenuItem onClick={onClose}>
        <ListItemText>Add Traveler</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default TravelerPicker
