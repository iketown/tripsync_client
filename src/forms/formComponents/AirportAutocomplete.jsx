import React, { useState } from "react"
import { Query } from "react-apollo"
import { airportAutocompleteQ } from "../../queries/flights/airportAutocomplete.query"
import { TextField, Menu, MenuItem } from "@material-ui/core"
//
import { showMe } from "../../helpers/showMe"
function AirportAutocomplete() {
  const [searchText, setSearchText] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const limit = 10
  return (
    <>
      <TextField
        value={searchText}
        onChange={e => {
          setAnchorEl(e.currentTarget)
          setSearchText(e.target.value)
        }}
      />
      <Query
        query={airportAutocompleteQ}
        variables={{ searchText, limit }}
        skip={searchText.length < 3}
      >
        {({ loading, error, data }) => {
          if (loading) return "loading..."
          if (error) return "error..."
          console.log("autoComp data", data)
          return (
            <>
              <Menu
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem>Hey</MenuItem>
                <MenuItem>Hey</MenuItem>
              </Menu>
              {showMe(data)}
            </>
          )
        }}
      </Query>
    </>
  )
}

export default AirportAutocomplete
