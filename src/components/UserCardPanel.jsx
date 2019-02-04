import React, { useState } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"

export const Panel = ({
  icon,
  title,
  mainContent,
  expanded,
  handleChange,
  classes = {}
}) => {
  return (
    <ExpansionPanel
      expanded={expanded === title}
      onChange={handleChange(title)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <div className={classes.icon}>{icon}</div>
        <Typography className={classes.heading}>{title}</Typography>
        {/* <Typography className={classes.secondaryHeading}>
          I am an expansion panel
        </Typography> */}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{mainContent}</ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

Panel.propTypes = {
  title: PropTypes.string.isRequired
}

const accordionStyles = theme => ({
  root: {
    width: "100%",
    border: "1px green solid"
  },
  icon: {
    flexBasis: "10%",
    flexShrink: 0
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  }
  //   secondaryHeading: {
  //     fontSize: theme.typography.pxToRem(15),
  //     color: theme.palette.text.secondary
  //   }
})

export default withStyles(accordionStyles)(Panel)
