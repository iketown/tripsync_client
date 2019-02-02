import React, { useState } from "react"
import { IconButton } from "@material-ui/core"
import { PersonAdd } from "@material-ui/icons"
import { Query } from "react-apollo"
//
import TravelerPicker from "./TravelerPicker.jsx"
import { myTravelersQ } from "../../queries/me.queries"
import { sortAdminLocsAlphabetically } from "../../helpers/sorters"
function AddRemoveTravelers({ addTraveler, travelerFilter, addedTravs }) {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Query query={myTravelersQ}>
      {({ loading, error, data }) => {
        if (loading) return <span>loading . . .</span>
        if (error) return <span>error . . .</span>
        const travelers = data.me.adminTravelers
        const adminLocs = (data && data.me && data.me.adminLocs) || []
        return (
          <>
            <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
              <PersonAdd />
            </IconButton>
            <TravelerPicker
              onClose={() => setAnchorEl(null)}
              travelers={travelers}
              anchorEl={anchorEl}
              addTraveler={addTraveler}
              travelerFilter={travelerFilter}
              addedTravs={addedTravs}
              adminLocs={sortAdminLocsAlphabetically(adminLocs)}
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
