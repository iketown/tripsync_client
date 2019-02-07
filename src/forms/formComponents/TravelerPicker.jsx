import React from "react"
import {
  Menu,
  MenuItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider
} from "@material-ui/core"
import { Mutation, Query } from "react-apollo"
import { ADD_TRAVELER_MUT } from "local../../queries/local.queries"

function TravelerPicker({ travelers, onClose, anchorEl, dontShowThese = [] }) {
  if (!travelers) return null
  return (
    <Menu onClose={onClose} anchorEl={anchorEl} open={!!anchorEl}>
      {travelers
        .filter(trav => !dontShowThese.includes(trav.id))
        .map(trav => {
          const fullName = `${trav.firstName} ${trav.lastName}`
          const airportCode =
            trav.freqAirports && trav.freqAirports.length
              ? trav.freqAirports[0].location.airportCode
              : ""
          return (
            <Mutation key={trav.id} mutation={ADD_TRAVELER_MUT}>
              {addTravelerApollo => {
                return (
                  <MenuItem
                    onClick={() => {
                      // addTraveler({ userId: trav.id, airportCode })
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
