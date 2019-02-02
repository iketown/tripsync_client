import React from "react"
import styled from "styled-components"
import { Typography, Button, IconButton } from "@material-ui/core"
import { Edit } from "@material-ui/icons"
const StyledImage = styled.div`
  background: url(https://airportcod.es/images/card/${p => p.airportCode}.jpg);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* max-width: 11rem; */
  border-radius: 2rem;
  position: relative;
  /* & ::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(to bottom right, #002f4b, #dc4225);
    opacity: 0.6;
  } */
`

function AirportImage({ airportCode, children }) {
  return <StyledImage airportCode={airportCode}>{children}</StyledImage>
}

export default AirportImage
