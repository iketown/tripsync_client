import React from "react"
import { Chip, Avatar } from "@material-ui/core"
import { Person } from "@material-ui/icons"
function ChartLegend({ props, toggleSelectedOrigin }) {
  const { payload } = props
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {payload.map((originObj, i) => {
        const {
          value,
          payload: { data, onClick },
          color
        } = originObj
        const { travelers } = data[0]
        return travelers.map(trav => {
          const { firstName, lastName, photoUrl, id } = trav
          return (
            <Chip
              style={{ margin: "3px", border: `2px solid ${color}` }}
              key={id + "legendChip"}
              avatar={
                photoUrl ? (
                  <Avatar alt={`${firstName} ${lastName}`} src={photoUrl} />
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
                  <small>{trav.firstName}</small>
                  <b>{value}</b>
                </div>
              }
              onClick={() => toggleSelectedOrigin(value)}
            />
          )
        })
      })}
    </div>
  )
}

export default ChartLegend
