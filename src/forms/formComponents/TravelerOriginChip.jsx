import React, { useState } from "react"
import { FullUserInfoQuery, AdminLocInfoFrag } from "../../queries/user.queries"
import {
  UPDATE_TRAVELER_ORIGIN,
  REMOVE_TRAVELER_MUT
} from "../../queries/local.queries"
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import {
  MenuItem,
  ListItemText,
  Avatar,
  Chip,
  Menu,
  Divider,
  Button,
  Grid
} from "@material-ui/core"
import { Person } from "@material-ui/icons"
import { withStyles } from "@material-ui/core/styles"
import { showMe } from "../../helpers/showMe"
import AirportAutocomplete from "./AirportAutocomplete.jsx"
import AirportAutocompleteDialogBox from "./AirportAutocompleteDialogBox.jsx"
import { shorten } from "../../helpers/utils"
//
//

function TravelerOriginChip({ userId, origin, smart }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [airportACBoxOpen, setAirportACBoxOpen] = useState(false)

  return (
    <Query query={FullUserInfoQuery} variables={{ userId }}>
      {({ loading, error, data: { fullUserInfo }, client }) => {
        if (loading) return "loading. . ."
        if (error) return "OriginChip error. . ."
        const { firstName, lastName, photoUrl, freqAirports } = fullUserInfo

        return (
          <>
            <Mutation mutation={REMOVE_TRAVELER_MUT} variables={{ userId }}>
              {removeTraveler => {
                const otherProps = smart
                  ? {
                      clickable: true,
                      onClick: e => {
                        setAnchorEl(e.currentTarget)
                      },
                      onDelete: removeTraveler
                    }
                  : {}
                return (
                  <Chip
                    style={{ marginLeft: "10px" }}
                    avatar={
                      photoUrl ? (
                        <Avatar
                          alt={`${firstName} ${lastName}`}
                          src={photoUrl}
                        />
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
                        <b>{origin}</b>
                      </div>
                    }
                    {...otherProps}
                  />
                )
              }}
            </Mutation>

            {/* 🛩️ 🛩️ 🛩️ popup menu to change airports 🛩️ 🛩️ 🛩️ */}
            <Mutation mutation={UPDATE_TRAVELER_ORIGIN}>
              {(updateTravelerOrigin, { data }) => {
                async function handleSubmitAirport(airportCode) {
                  console.log("calling updateTravOr", userId, airportCode)
                  updateTravelerOrigin({
                    variables: { userId, airportCode }
                  })
                  setAnchorEl(null)
                }
                return (
                  <>
                    <AirportAutocompleteDialogBox
                      open={airportACBoxOpen}
                      setAirportACBoxOpen={setAirportACBoxOpen}
                      {...{ firstName, lastName, userId }}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      open={!!anchorEl}
                      onClose={() => setAnchorEl(null)}
                    >
                      <MenuItem onClick={() => setAirportACBoxOpen(true)}>
                        Other Airport
                      </MenuItem>
                      <MenuItem>
                        <AirportAutocomplete />
                      </MenuItem>
                      {freqAirports &&
                        freqAirports.map(adminLoc => {
                          const { airportCode, name } = adminLoc.location
                          return (
                            <MenuItem
                              key={airportCode + "freqAirports"}
                              onClick={() => {
                                console.log(
                                  "calling handleSubmitAp",
                                  airportCode
                                )
                                handleSubmitAirport(airportCode)
                              }}
                            >
                              <ListItemText
                                primary={airportCode}
                                secondary={shorten(name)}
                              />
                            </MenuItem>
                          )
                        })}
                      {freqAirports.length && <Divider />}

                      {/* {adminLocs
                // filter out airports that have already been listed in my 'home airports'
                .filter(
                  loc =>
                    !freqAirports.find(
                      homeAP => homeAP.airportCode === loc.location.airportCode
                    )
                )
                .map(adminLoc => {
                  const { location } = adminLoc
                  const { airportCode, name } = location
                  return (
                    <MenuItem
                      key={adminLoc.id}
                      onClick={() => {
                        handleSubmitAirport(airportCode)
                      }}
                    >
                      <ListItemText
                        primary={airportCode}
                        secondary={shorten(name)}
                      />
                    </MenuItem>
                  )
                })} */}
                    </Menu>
                  </>
                )
              }}
            </Mutation>
            {/* {showMe(fullUserInfo, "fullUserInfo")} */}
          </>
        )
      }}
    </Query>
  )
}

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  }
})

export default withStyles(styles)(TravelerOriginChip)
