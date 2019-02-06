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
  summaryLine,
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
        <div className={classes.topPanel}>
          <div className={classes.iconAndTitle}>
            <span className={classes.icon}>{icon}</span>
            <Typography component="span" className={classes.heading}>
              {title}
            </Typography>
          </div>
          {summaryLine && (
            <Typography className={classes.secondaryHeading}>
              {summaryLine}
            </Typography>
          )}
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{mainContent} </ExpansionPanelDetails>
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
  topPanel: {
    justifyContent: "space-between",
    display: "flex",
    width: "100%",
    alignItems: "center"
  },
  icon: {
    flexBasis: "10%",
    flexShrink: 0
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    display: "inline-block",
    marginLeft: "1rem"
  },
  iconAndTitle: {
    display: "flex",
    alignItems: "center"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
})

export default withStyles(accordionStyles)(Panel)
