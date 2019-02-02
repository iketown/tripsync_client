import React, { useState } from "react"
import { Query } from "react-apollo"
import { ArcherElement } from "react-archer"
//
import { myTravelersQ } from "../../queries/me.queries"
import TravelerChip from "./TravelerChip.jsx"
import TravelerChipDumb from "./TravelerChipDumb"

//

function TravelersList({ travelerObjs, removeTraveler, setAirport, dumb }) {
  if (!travelerObjs) return null
  return (
    <Query query={myTravelersQ}>
      {({ loading, error, data }) => {
        console.log("data", data)
        if (loading) return "loading..."
        if (error) return "error!"
        if (!data.me) return null
        const { adminTravelers, adminLocs } = data.me
        return (
          <>
            {adminTravelers
              .filter(traveler => travelerObjs[traveler.id])
              .map(traveler =>
                !dumb ? (
                  <TravelerChip
                    key={traveler.id}
                    trav={traveler}
                    removeMe={() => removeTraveler(traveler.id)}
                    initialAirport={travelerObjs[traveler.id]}
                    setAirport={setAirport}
                    adminLocs={adminLocs}
                  />
                ) : (
                  <TravelerChipDumb
                    trav={traveler}
                    key={traveler.id + "dumb"}
                    airportCode={travelerObjs[traveler.id]}
                    removeMe={() => removeTraveler(traveler.id)}
                  />
                )
              )}
          </>
        )
      }}
    </Query>
  )
}

export default TravelersList
