import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Avatar,
  Divider
} from "@material-ui/core"
import {
  LocalAirportOutlined,
  MailOutline,
  CardMembershipOutlined
} from "@material-ui/icons"
import UserCardPanel from "./UserCardPanel"
import UserAddressForm from "../forms/formComponents/UserAddressForm"
import UserAirports from "../forms/formComponents/UserAirports.jsx"
import { Query } from "react-apollo"
import { FullUserInfoQuery } from "../queries/user.queries"
//
//
//
function UserCard({ userId, classes }) {
  return (
    <Query query={FullUserInfoQuery} variables={{ userId }}>
      {({ loading, error, data }) => {
        if (loading) return "loading..."
        if (error) return "error..."
        console.log("usercard data", data)
        const { fullUserInfo } = data
        const { firstName, lastName, userName, photoUrl } = fullUserInfo
        const fullName = `${firstName} ${lastName}`

        // return <div>yo</div>
        return (
          <Card className={classes.card}>
            <CardContent>
              <Grid item xs={12} container spacing={8}>
                <Grid
                  className={classes.gridItem + " " + classes.photoColumn}
                  item
                  xs={3}
                >
                  <Avatar
                    alt={fullName}
                    src={photoUrl}
                    className={classes.bigAvatar}
                  />
                  <Typography variant="body1">
                    <span>{firstName}</span>
                  </Typography>
                  <Typography variant="body1">
                    <span>{lastName}</span>
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography variant="caption">
                    <span>{userName}</span>
                  </Typography>
                </Grid>
                <Grid className={classes.gridItem} item xs={9}>
                  <Accordion trav={fullUserInfo} />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions />
          </Card>
        )
      }}
    </Query>
  )
}

const styles = theme => ({
  card: {
    // display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  gridItem: {
    // border: "1px green dotted"
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  photoColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  divider: {
    minWidth: "7rem",
    background: "gainsboro"
  }
})

export default withStyles(styles)(UserCard)

//
//
//

export const Accordion = ({ trav }) => {
  const [expanded, setExpanded] = useState("")
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <div>
      <UserCardPanel
        handleChange={handleChange}
        expanded={expanded}
        title="Contact"
        icon={<MailOutline />}
        mainContent={<UserAddressForm trav={trav} />}
        // summaryLine={trav.homeAddress && trav.homeAddress.street}
      />
      <UserCardPanel
        handleChange={handleChange}
        expanded={expanded}
        title="Airports"
        icon={<LocalAirportOutlined />}
        mainContent={<UserAirports trav={trav} />}
        // summaryLine={`frequently used airports`}
      />
      <UserCardPanel
        handleChange={handleChange}
        expanded={expanded}
        title="Memberships"
        icon={<CardMembershipOutlined />}
      />
    </div>
  )
}
