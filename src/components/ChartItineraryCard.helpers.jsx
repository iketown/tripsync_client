import React from "react"
import { Typography } from "@material-ui/core"
import moment from "moment"
// keeps all the entries in the 'duration' column of the card consistent
export function formattedDuration(duration) {
  const styles = { display: "inline" }
  const hourStyles = { marginLeft: "2px" }
  return (
    <div style={{ gridColumn: "dur", marginLeft: "3px" }}>
      <Typography style={{ ...styles, ...hourStyles }}>
        {duration.hours()}
      </Typography>
      <Typography style={styles} variant="caption" color="textSecondary">
        h
      </Typography>
      <Typography style={{ ...styles, ...hourStyles }}>
        {duration.minutes()}
      </Typography>
      <Typography style={styles} variant="caption" color="textSecondary">
        m
      </Typography>
    </div>
  )
}

// the departure or landing airport, and the time
export function displayAirportTime(airportCode, time, depOrArr) {
  return (
    <div style={{ gridColumnStart: depOrArr }}>
      <Typography style={{ lineHeight: "6px" }} variant="button">
        {airportCode}
      </Typography>
      <span style={{ margin: "0", gridColumnStart: depOrArr }}>
        {timeHourMinute(time)}
        {timeAmPm(time)}
      </span>
    </div>
  )
}

function timeHourMinute(string) {
  return (
    <Typography
      color="textPrimary"
      style={{ display: "inline" }}
      component="span"
    >
      {moment(string).format("h:mm")}
    </Typography>
  )
}
function timeAmPm(string) {
  return (
    <Typography
      style={{ display: "inline", marginLeft: "2px" }}
      color="textSecondary"
      component="span"
    >
      {moment(string).format("a")}
    </Typography>
  )
}
