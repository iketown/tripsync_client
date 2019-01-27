import React from "react"
import styled from "styled-components"

const ImageChip = styled.div`
  position: ${p => (p.first ? "relative" : "absolute")};
  top: ${p => p.yOffset}px;
  left: ${p => p.xOffset}px;
  background: url(https://images.kiwi.com/airlines/64/${p => p.code}.png), white;
  background-size: contain;
  border: 1px #e6e6e6 solid;
  border-radius: 6px;
  height: ${p => p.scale * 64}px;
  width: ${p => p.scale * 64}px;
`

function AirlinePhoto({ rides }) {
  const airlineCodes = rides.map(r => r.company.iata)

  return (
    <div
      style={{ position: "relative", height: `${54 + rides.length * 10}px` }}
    >
      {airlineCodes.map((code, i) => {
        const totalFlights = rides.length
        const scale = totalFlights > 1 ? 3 / 4 : 1
        const xOffset = i * 5
        const yOffset = i * 10
        return (
          <ImageChip
            xOffset={xOffset}
            yOffset={yOffset}
            first={i === 0}
            scale={scale}
            code={code}
          />
        )
      })}
    </div>
  )
}

export default AirlinePhoto
