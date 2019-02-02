import React from "react"
import {
  Menu,
  MenuItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider
} from "@material-ui/core"

function TravelerPicker({
  travelers,
  onClose,
  addTraveler,
  anchorEl,
  addedTravs,
  adminLocs
}) {
  if (!travelers) return null
  console.log("added travs", addedTravs)
  return (
    <Menu
      PaperProps={{ style: {} }}
      onClose={onClose}
      anchorEl={anchorEl}
      open={!!anchorEl}
    >
      {travelers
        .filter(trav => !addedTravs[trav.id])
        .map(trav => {
          const fullName = `${trav.firstName} ${trav.lastName}`
          const airport =
            trav.homeAirports && trav.homeAirports.length
              ? trav.homeAirports[0].airportCode
              : ""
          return (
            <MenuItem
              key={trav.id}
              onClick={() => {
                addTraveler({ userId: trav.id, airport })
                onClose()
              }}
            >
              <ListItemAvatar>
                <Avatar src={trav.photoUrl} alt={fullName} />
              </ListItemAvatar>
              <ListItemText primary={fullName} secondary={airport} inset />
            </MenuItem>
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
