import React, { Component } from "react"
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  withStyles,
  Grid
} from "@material-ui/core"
import styled from "styled-components"
//
import AirlineImage from "./AirlineImgSimple.jsx"
import RideLine from "./RideLine"
import TotalLine from "./TotalLine"
import LayoverLine from "./LayoverLine"
import { showMe } from "../../helpers/showMe"

const RidesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, max-content) 1fr;
  column-gap: 3px;
  align-items: center;
  justify-items: start;
`

const FlightDetailsGrid = styled.div`
  display: grid;
  grid-template-areas:
    "names names price"
    "logo  rides rides";
  column-gap: 1rem;
`

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  names: {
    fontSize: 14,
    gridArea: "names"
  },
  price: {
    gridArea: "price",
    justifySelf: "end"
  },
  logo: {
    gridArea: "logo"
  },
  rides: {
    gridArea: "rides"
  }
}
function formatName({ firstName, lastName, userName }, i, travelerCount) {
  let response = ""
  if (i > 0) response += ", "
  if (firstName) response += firstName + " "
  // if more than one traveler, only show first letter of last name
  if (lastName) response += travelerCount > 1 ? lastName.charAt(0) : lastName
  if (!firstName && !lastName) response += userName
  return response
}
export class FlightCard extends Component {
  render() {
    const { classes, flight } = this.props
    const { travelers, price, rides } = flight
    return (
      <Card className={classes.card}>
        <CardContent>
          <FlightDetailsGrid>
            <Typography
              className={classes.names}
              color="textSecondary"
              gutterBottom
            >
              {travelers.map((t, i) => formatName(t, i, travelers.length))}
            </Typography>
            <Typography variant="button" className={classes.price}>
              <span>$</span>
              {price}
            </Typography>
            <AirlineImage className={classes.logo} rides={rides} size="50px" />
            <RidesGrid className={classes.rides}>
              {rides.map((ride, i) => (
                <>
                  <LayoverLine ride={ride} prevRide={rides[i - 1]} />
                  <RideLine ride={ride} />
                </>
              ))}
              <TotalLine rides={rides} />
            </RidesGrid>
          </FlightDetailsGrid>
          {/* {showMe(flight)} */}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(FlightCard)
