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
//
import AirlinePhoto from "./AirlinePhoto"
import RideLine from "./RideLine"
import { showMe } from "../../helpers/showMe"

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

export class FlightCard extends Component {
  render() {
    const { classes, flight } = this.props
    const { travelers, price, rides } = flight

    const bull = <span className={classes.bullet}>•</span>
    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {travelers.map((t, i) => (i ? ", " + t.userName : t.userName))}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <AirlinePhoto rides={rides} />
            </Grid>
            <Grid item xs={8}>
              {rides.map(ride => (
                <RideLine ride={ride} />
              ))}
            </Grid>
            <Grid item xs={2}>
              totals
            </Grid>
          </Grid>

          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
          {showMe(flight)}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(FlightCard)
