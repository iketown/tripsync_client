import React from "react"
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

function TravelerChipDumb({ airportCode, trav, removeMe }) {
  const { firstName, lastName, photoUrl } = trav
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
      label={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <small>{firstName}</small>
          <b>{airportCode}</b>
        </div>
      }
      //   onDelete={removeMe}
    />
  )
}

export default TravelerChipDumb
