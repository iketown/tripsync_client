import React from "react"
import { Mutation } from "react-apollo"
import { AddFreqAirport, UserFreqAirportQ } from "../../queries/user.queries"
import AirportAutocomplete from "./AirportAutocomplete.jsx"

//
//
function AirportACMutation({ trav }) {
  const { id: userId, freqAirports } = trav
  return (
    <Mutation
      mutation={AddFreqAirport}
      refetchQueries={[{ query: UserFreqAirportQ, variables: { userId } }]}
      update={() => {}}
    >
      {(addFreqAirport, { data }) => {
        function handleSelectedAirport({ airportCode }) {
          // prevent duplicates here
          if (
            freqAirports.find(
              adminLoc => adminLoc.location.airportCode === airportCode
            )
          )
            return false
          const variables = {
            userId,
            airportCode
          }
          addFreqAirport({
            variables
          })
        }
        return (
          <AirportAutocomplete
            label="Add Airport"
            handleSelectedAirport={handleSelectedAirport}
          />
        )
      }}
    </Mutation>
  )
}

export default AirportACMutation
