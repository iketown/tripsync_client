import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
const Duration = styled.span`
  .hrsmins {
    /* font-weight: bold; */
    margin-left: 3px;
  }
  .delimiter {
    font-weight: lighter;
    color: grey;
  }
`

export const formatDuration = ({ hrs, mins }) => {
  return (
    <Duration>
      <span className="hrsmins">{hrs}</span>
      <span className="delimiter">h</span>
      <span className="hrsmins">{mins}</span>
      <span className="delimiter">m</span>
    </Duration>
  )
}
