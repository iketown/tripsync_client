import React, { useState } from "react"
import { Query } from "react-apollo"
import { airportAutocompleteQ } from "../../queries/flights/airportAutocomplete.query"
import {
  TextField,
  MenuItem,
  ListItemText,
  Menu,
  InputAdornment,
  IconButton
} from "@material-ui/core"
import Autocomplete from "react-autocomplete"
import { AddCircleOutline } from "@material-ui/icons"
//
function AirportAutocomplete({
  label,
  handleSelectedAirport,
  autoFocus,
  skipConfirmationButton
}) {
  const [searchText, setSearchText] = useState("")
  const [chosenAirport, setChosenAirport] = useState({})
  const limit = 10
  return (
    <Query
      query={airportAutocompleteQ}
      variables={{ searchText, limit }}
      skip={searchText.length < 3}
    >
      {({ loading, error, data }) => {
        // if (loading) return "loading..."
        if (error) return "error..."
        return (
          <>
            <Autocomplete
              menuStyle={{
                borderRadius: "3px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                background: "rgba(255, 255, 255, 0.9)",
                padding: "2px 0",
                fontSize: "90%",
                position: "fixed",
                overflow: "auto",
                maxHeight: "50%", // TODO: don't cheat, let it flow to the bottom
                zIndex: 2,
                display: searchText ? "inherit" : "none"
              }}
              getItemValue={ap => ap.airportCode}
              items={
                (data &&
                  data.airportAutocomplete &&
                  data.airportAutocomplete.filter(ap => !!ap)) ||
                []
              }
              renderItem={(item, isHighlighted) => {
                if (!item) return null
                return (
                  <MenuItem
                    key={item && item.airportCode}
                    style={{
                      background: isHighlighted ? "lightgray" : "white"
                    }}
                  >
                    <ListItemText
                      primary={item && item.airportCode}
                      secondary={item && item.name}
                    />
                  </MenuItem>
                )
              }}
              value={searchText}
              onChange={(e, value) => {
                setSearchText(value)
              }}
              onSelect={(val, item) => {
                setChosenAirport(item)
                setSearchText(val)
                skipConfirmationButton && handleSelectedAirport(item)
              }}
              renderInput={props => {
                const { ref, foo, ...rest } = props
                return (
                  <TextField
                    autoFocus={autoFocus}
                    label={label}
                    {...rest}
                    inputRef={ref}
                    helperText={
                      chosenAirport &&
                      chosenAirport.name &&
                      chosenAirport.name
                        .replace("International", "Int.")
                        .slice(0, 30)
                    }
                    InputProps={{
                      endAdornment: chosenAirport && chosenAirport.airportCode && (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              handleSelectedAirport(chosenAirport)
                              setChosenAirport(null)
                              setSearchText("")
                            }}
                          >
                            <AddCircleOutline color="primary" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )
              }}
            />
          </>
        )
      }}
    </Query>
  )
}

export default AirportAutocomplete
