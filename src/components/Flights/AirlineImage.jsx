import React from "react"
import styled from "styled-components"

const ImageChip = styled.div`
  position: absolute;
  top: ${p => p.yOffset}px;
  left: ${p => p.xOffset}px;
  background: url(https://www.gstatic.com/flights/airline_logos/70px/${p => p.code}.png),
    white;
  background-size: contain;
  /* border: 1px #e6e6e6 solid; */
  box-shadow: 2px 2px 2px 0px gainsboro;
  border-radius: 6px;
  height: 50px;
  width: 50px;
  transition: 1s all;
  &:hover {
    top: ${p => p.yOffset + 10}px;
    left: ${p => p.xOffset + 10}px;
    z-index: 2;
  }
`

const ChipContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: ${p => 54 + p.ridesLength * 5}px;
  /* width: ${p => 54 + p.ridesLength * 5}px; */
`
const PhotoCenterer = styled.div`
  position: relative;
  width: ${p => 54 + p.ridesLength * 5}px;
`

function AirlinePhoto({ rides }) {
  const airlineCodes = rides.map(r => r.company.iata)

  return (
    <ChipContainer ridesLength={rides.length}>
      <PhotoCenterer ridesLength={rides.length}>
        {airlineCodes.map((code, i) => {
          const xOffset = i * 5
          const yOffset = i * 5
          return (
            <ImageChip
              xOffset={xOffset}
              yOffset={yOffset}
              first={i === 0}
              code={code}
            />
          )
        })}
      </PhotoCenterer>
    </ChipContainer>
  )
}

export default AirlinePhoto
