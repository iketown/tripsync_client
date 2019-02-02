import React, { useState, useEffect } from "react"

import {
  Input,
  InputLabel,
  FormControl,
  TextField,
  Typography,
  IconButton,
  InputAdornment
} from "@material-ui/core"
import { Edit, Forward } from "@material-ui/icons"
import styled from "styled-components"
//
import AirportAutocomplete from "./AirportAutocomplete.jsx"
import AirportImage from "./AirportImage"

const StyledText = styled.h1`
  font-size: 23px;
  color: white;
  margin: 5px;
`
//
function DestinationPicker() {
  const [airportCode, setAirportCode] = useState()
  const [editing, setEditing] = useState(true)
  function handleSubmit() {
    setEditing(false)
  }

  return (
    <AirportImage setEditing={setEditing} airportCode={!editing && airportCode}>
      {editing ? (
        // <TextField
        //   label="Destination Airport"
        //   id="destinationAirport"
        //   margin="normal"
        //   value={airportCode}
        //   onChange={e => setAirportCode(e.target.value)}
        //   InputProps={{
        //     endAdornment: (
        //       <InputAdornment position="end">
        //         <IconButton onClick={() => setEditing(false)}>
        //           <Forward />
        //         </IconButton>
        //       </InputAdornment>
        //     )
        //   }}
        // />
        <AirportAutocomplete />
      ) : (
        <>
          <Typography>
            <StyledText>{airportCode.toUpperCase()}</StyledText>
          </Typography>
          <IconButton onClick={() => setEditing(true)}>
            <Edit style={{ color: "white" }} />
          </IconButton>
        </>
      )}
    </AirportImage>
  )
}

export default DestinationPicker
