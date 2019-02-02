import React, { useState } from "react"
import {
  MenuItem,
  Input,
  ListItemText,
  Avatar,
  Chip,
  Menu,
  IconButton,
  Divider
} from "@material-ui/core"
import { ArcherElement } from "react-archer"
import { Person, Forward } from "@material-ui/icons"

const TravelerChip = ({
  trav,
  removeMe,
  setAirport,
  initialAirport,
  adminLocs
}) => {
  const { firstName, lastName, homeAirports, id, username, photoUrl } = trav
  const [anchorEl, setAnchorEl] = useState(null)
  const [chosenAirport, setChosenAirport] = useState(initialAirport.airportCode)
  async function handleSubmitAirport(airport) {
    if (chosenAirport !== airport) await setChosenAirport(airport)
    // TODO validate this is a real airport and not junk input.  autocomplete.
    // setAirport 👇 sets state on FlightSearchForm (grandparent)
    setAirport({ userId: id, airportCode: airport })
    setAnchorEl(null)
  }
  return (
    <>
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
        onDelete={removeMe}
      />

      {/* 🛩️ 🛩️ 🛩️ popup menu to change airports 🛩️ 🛩️ 🛩️ */}
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {homeAirports &&
          homeAirports.map(myAirport => {
            const { airportCode, name } = myAirport
            return (
              <MenuItem
                key={airportCode + "homeAirports"}
                onClick={() => handleSubmitAirport(airportCode)}
              >
                <ListItemText primary={airportCode} secondary={name} />
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
                onClick={() => handleSubmitAirport(airportCode)}
              >
                <ListItemText primary={airportCode} secondary={name} />
              </MenuItem>
            )
          })}
        <form onSubmit={() => handleSubmitAirport(chosenAirport)}>
          <MenuItem>
            <Input
              endAdornment={
                <IconButton
                  onClick={() => handleSubmitAirport(chosenAirport)}
                  size="small"
                >
                  <Forward />
                </IconButton>
              }
              value={chosenAirport}
              onChange={e => setChosenAirport(e.target.value)}
            />
          </MenuItem>
        </form>
      </Menu>
    </>
  )
}

export default TravelerChip
