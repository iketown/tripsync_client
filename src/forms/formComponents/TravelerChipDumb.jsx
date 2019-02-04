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

function TravelerChipDumb({ airportCode, trav, removeTraveler }) {
  const { firstName, lastName, photoUrl, id } = trav
  console.log("dumb chip id", id)
  return (
    <ArcherElement
      id={`userDest${id}`}
      style={{ display: "inline-block" }}
      // style={{ border: "1px solid green", width: "1rem", height: "1rem" }}
    >
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
    </ArcherElement>
  )
}

export default TravelerChipDumb
