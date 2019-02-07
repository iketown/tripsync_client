import React, { useState } from "react"
import { IconButton } from "@material-ui/core"
import { PersonAdd } from "@material-ui/icons"
import { Query } from "react-apollo"
//
import TravelerPicker from "./TravelerPicker.jsx"
import { myTravelersQ } from "../../queries/me.queries"
function AddRemoveTravelers() {
  const [anchorEl, setAnchorEl] = useState(null)
  return (
    <Query query={myTravelersQ}>
      {({ loading, error, data }) => {
        if (loading) return <span>loading . . .</span>
        if (error) return <span>AddRemoveTravelers error . . .</span>
        console.log("data in AddRemoveTrav", data)
        const travelers = data.me.adminTravelers
        const dontShowThese = data.travelersOrigins.map(
          travOrig => travOrig.userId
        )
        return (
          <>
            <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
              <PersonAdd />
            </IconButton>
            <TravelerPicker
              onClose={() => setAnchorEl(null)}
              travelers={travelers}
              anchorEl={anchorEl}
              dontShowThese={dontShowThese}
            />
          </>
        )
      }}
    </Query>
  )
}

export default AddRemoveTravelers

// TODO get list of recent locations
// TODO get user's list of home/preferred airports
