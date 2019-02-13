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
import LineTo from "react-lineto"

import { Person } from "@material-ui/icons"
import { withStyles } from "@material-ui/core/styles"
import { showMe } from "../../helpers/showMe"
import AirportAutocomplete from "./AirportAutocomplete.jsx"
import AirportAutocompleteDialogBox from "./AirportAutocompleteDialogBox.jsx"
import { shorten } from "../../helpers/utils"
//
//

function TravelerOriginChip({ userId, origin, smart, first }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [airportACBoxOpen, setAirportACBoxOpen] = useState(false)

  return (
    <Query query={FullUserInfoQuery} variables={{ id: userId }}>
      {({ loading, error, data, client }) => {
        if (loading) return <Chip label="loading" />
        if (error) return "OriginChip error. . ."
        const {
          firstName,
          lastName,
          photoUrl,
          freqAirports
        } = data.fullUserInfo

        return (
          <>
            <Mutation mutation={REMOVE_TRAVELER_MUT} variables={{ id: userId }}>
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
                    className={userId + "lineStart"}
                    style={{ marginTop: first ? "0" : "5px" }}
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
            {/* <LineTo
              from={userId + "lineStart"}
              fromAnchor={"right"}
              to="destinationAirport"
              toAnchor={"left"}
              delay
            /> */}
            {/* 🛩️ 🛩️ 🛩️ popup menu to change airports 🛩️ 🛩️ 🛩️ */}
            <Mutation mutation={UPDATE_TRAVELER_ORIGIN}>
              {(updateTravelerOrigin, { data }) => {
                async function handleSubmitAirport(airportCode) {
                  const variables = { id: userId, airportCode }
                  console.log("variables in handleSubmitAirport", variables)
                  updateTravelerOrigin({
                    variables
                  })
                  setAnchorEl(null)
                }
                return (
                  <>
                    <AirportAutocompleteDialogBox
                      open={airportACBoxOpen}
                      setAirportACBoxOpen={setAirportACBoxOpen}
                      handleSubmitAirport={handleSubmitAirport}
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
                      {freqAirports &&
                        freqAirports.map(adminLoc => {
                          const { airportCode, name } = adminLoc.location
                          return (
                            <MenuItem
                              key={airportCode + "freqAirports"}
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
                        })}
                      {freqAirports.length && <Divider />}
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
