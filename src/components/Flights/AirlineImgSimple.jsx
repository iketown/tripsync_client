import React from "react"
import styled from "styled-components"

const AirlineImage = styled.div`
  width: 50px;
  height: 50px;
  background: url(https://flightaware.com/images/airline_logos/90p/${p => p.icao}.png);
  background-size: cover;
  align-self: center;
`
function AirlinePhoto({ rides, size }) {
  const airlineCode = rides[0].company.iata
  const icao = rides[0].company.icao
  return <AirlineImage icao={icao} />
}

export default AirlinePhoto
