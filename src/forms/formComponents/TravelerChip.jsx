import React, { useState } from "react"
import {
  MenuItem,
  ListItemText,
  Avatar,
  Chip,
  Menu,
  Divider,
  Button
} from "@material-ui/core"
import { ArcherElement } from "react-archer"
import { Person, Forward } from "@material-ui/icons"
import AirportAutocomplete from "./AirportAutocomplete.jsx"
import { shorten } from "../../helpers/utils"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
//
const REMOVE_TRAVELER = gql`
  mutation removeTraveler($userId: ID!) {
    removeTraveler(userId: $userId) @client
  }
`

const UPDATE_TRAVELER = gql`
  mutation updateTraveler($userId: ID!, $update: TravelerInput) {
    updateTraveler(userId: $userId, update: $update) @client {
      airportCode
      userId
    }
  }
`
//
//
const TravelerChip = ({
  trav,
  removeMe,
  removeTraveler,
  initialAirport,
  adminLocs
}) => {
  const { firstName, lastName, homeAirports, id, username, photoUrl } = trav
  const [anchorEl, setAnchorEl] = useState(null)
  const [chosenAirport, setChosenAirport] = useState(initialAirport)

  return (
    <>
      <ArcherElement
        id={`user${id}`}
        relations={[
          {
            targetId: "destinationAirport",
            targetAnchor: "top",
            sourceAnchor: "bottom"
          }
        ]}
      >
        <Mutation mutation={REMOVE_TRAVELER}>
          {(removeTravelerApollo, { data }) => {
            return (
              <Chip
                style={{ marginLeft: "10px" }}
                avatar={
                  photoUrl ? (
                    <Avatar alt={`${firstName} ${lastName}`} src={photoUrl} />
                  ) : (
                    <Avatar alt={`${firstName} ${lastName}`}>
                      <Person />
                    </Avatar>
                  )
                }
                clickable
                onClick={e => setAnchorEl(e.currentTarget)}
                label={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <small>{firstName}</small>
                    <b>{chosenAirport}</b>
                  </div>
                }
                onDelete={() => {
                  removeTravelerApollo({ variables: { userId: id } })
                  removeTraveler(id)
                }}
              />
            )
          }}
        </Mutation>
      </ArcherElement>
      {/* 🛩️ 🛩️ 🛩️ popup menu to change airports 🛩️ 🛩️ 🛩️ */}
      <Mutation mutation={UPDATE_TRAVELER}>
        {(updateTravMutation, { data }) => {
          if (data && data.updateTraveler) {
            const { airportCode } = data.updateTraveler
            if (chosenAirport !== airportCode)
              // setChosenAirport is only local (display) state
              setChosenAirport(data.updateTraveler.airportCode)
          }
          async function handleSubmitAirport(airportCode) {
            updateTravMutation({
              variables: { userId: id, update: { airportCode } }
            })
            setAnchorEl(null)
          }
          return (
            <Menu
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem>Choose Airport</MenuItem>
              <MenuItem>
                <AirportAutocomplete />
              </MenuItem>
              {homeAirports &&
                homeAirports.map(myAirport => {
                  const { airportCode, name } = myAirport
                  return (
                    <MenuItem
                      key={airportCode + "homeAirports"}
                      onClick={() => handleSubmitAirport(airportCode)}
                    >
                      <ListItemText
                        primary={airportCode}
                        secondary={shorten(name)}
                      />
                    </MenuItem>
                  )
                })}
              {homeAirports.length && <Divider />}

              {adminLocs
                // filter out airports that have already been listed in my 'home airports'
                .filter(
                  loc =>
                    !homeAirports.find(
                      homeAP => homeAP.airportCode === loc.location.airportCode
                    )
                )
                .map(adminLoc => {
                  const { location } = adminLoc
                  const { airportCode, name } = location
                  return (
                    <MenuItem
                      key={adminLoc.id}
                      onClick={() => {
                        handleSubmitAirport(airportCode)
                      }}
                    >
                      <ListItemText
                        primary={airportCode}
                        secondary={shorten(name)}
                      />
                    </MenuItem>
                  )
                })}
            </Menu>
          )
        }}
      </Mutation>
    </>
  )
}

export default TravelerChip
