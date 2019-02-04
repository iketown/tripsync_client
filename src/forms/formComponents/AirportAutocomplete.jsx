import React, { useState } from "react"
import { Query } from "react-apollo"
import { airportAutocompleteQ } from "../../queries/flights/airportAutocomplete.query"
import { TextField, MenuItem, ListItemText, Menu } from "@material-ui/core"
import Autocomplete from "react-autocomplete"
//
function AirportAutocomplete({ label, handleSelectedAirport }) {
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
                handleSelectedAirport(item)
                setSearchText(val)
              }}
              renderInput={props => {
                const { ref, foo, ...rest } = props
                return (
                  <TextField
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
