import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import {
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText
} from "@material-ui/core"
import {
  LocalAirport,
  AccountCircle,
  Menu as MenuIcon,
  People,
  GridOff,
  GridOn
} from "@material-ui/icons"
import { Link } from "react-router-dom"
//
import LoginModal from "./LoginModal.jsx"
import { signOut } from "../auth/auth"

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: "none"
  }
}

class ButtonAppBar extends Component {
  state = {
    modalOpen: false,
    signedIn: false,
    anchorEl: null
  }
  componentDidMount() {
    const signedIn = localStorage.getItem("signed-in")
    this.setState({ signedIn })
  }
  handleMenu = e => {
    this.setState({ anchorEl: e.currentTarget })
  }
  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }
  handleSignout = () => {
    this.setState({ signedIn: false })
    signOut()
  }
  handleSignin = () => {
    this.setState({ modalOpen: true })
  }
  handleCloseModal = () => {
    const signedIn = localStorage.getItem("signed-in")
    this.setState({ signedIn, modalOpen: false })
  }
  handleCloseMenu = () => {
    this.setState({ anchorEl: null })
  }
  render() {
    const { classes } = this.props
    const { modalOpen, signedIn, anchorEl } = this.state
    const open = !!anchorEl
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              onClick={this.props.toggleGrid}
              className={classes.menuButton}
              color="inherit"
            >
              {this.props.showGrid ? <GridOff /> : <GridOn />}
            </IconButton>

            <Typography variant="h6" color="inherit" className={classes.grow}>
              TripSync
            </Typography>
            <IconButton color="inherit" component={Link} to="/flights">
              <LocalAirport />
            </IconButton>
            {signedIn && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleCloseMenu}
                >
                  <LinkMenuItem
                    to="/trips"
                    icon={<LocalAirport />}
                    text="My Trips"
                    handleCloseMenu={this.handleCloseMenu}
                  />
                  <LinkMenuItem
                    to="/travelers"
                    icon={<People />}
                    text="My Travelers"
                    handleCloseMenu={this.handleCloseMenu}
                  />
                </Menu>
              </div>
            )}
            {signedIn ? (
              <Button color="inherit" onClick={this.handleSignout}>
                Sign Out
              </Button>
            ) : (
              <Button color="inherit" onClick={this.handleSignin}>
                Sign In
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <LoginModal open={modalOpen} handleClose={this.handleCloseModal} />
      </div>
    )
  }
}

const LinkMenuItem = withStyles(styles)(
  ({ classes, to, icon, text, handleCloseMenu }) => (
    <Link to={to} className={classes.link}>
      <MenuItem onClick={handleCloseMenu}>
        <ListItemText>{text}</ListItemText>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
      </MenuItem>
    </Link>
  )
)

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)
