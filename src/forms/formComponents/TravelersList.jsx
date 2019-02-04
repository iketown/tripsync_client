import React, { useState } from "react"
import { Query } from "react-apollo"
import { ArcherElement } from "react-archer"
//
import { myTravelersQ, myLocsQ } from "../../queries/me.queries"
import TravelerChip from "./TravelerChip.jsx"
import TravelerChipDumb from "./TravelerChipDumb"

function TravelersList({ travelerObjs, removeTraveler, setAirport, dumb }) {
  if (!travelerObjs) return null
  return (
    <Query query={myLocsQ}>
      {({ loading, error, data: locsData }) => {
        if (loading) return "loading..."
        if (!locsData.me) return null
        const { adminLocs } = locsData.me
        return (
          <Query query={myTravelersQ}>
            {({ loading, error, data }) => {
              if (loading) return "loading..."
              if (error) return "error!"
              if (!data.me) return null
              const { adminTravelers } = data.me
              return (
                <>
                  {adminTravelers
                    .filter(traveler => travelerObjs[traveler.id])
                    .map(traveler =>
                      !dumb ? (
                        <TravelerChip
                          key={traveler.id}
                          trav={traveler}
                          removeTraveler={removeTraveler}
                          initialAirport={travelerObjs[traveler.id]}
                          setAirport={setAirport}
                          adminLocs={adminLocs}
                        />
                      ) : (
                        <TravelerChipDumb
                          key={traveler.id + "dumb"}
                          trav={traveler}
                          airportCode={travelerObjs[traveler.id]}
                          removeTraveler={removeTraveler}
                        />
                      )
                    )}
                </>
              )
            }}
          </Query>
        )
      }}
    </Query>
  )
}

export default TravelersList
