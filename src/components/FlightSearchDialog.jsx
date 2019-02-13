import React from "react"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
  LinearProgress
} from "@material-ui/core"

function Transition(props) {
  return <Slide direction="up" {...props} />
}

function FlightSearchDialog({ open, handleClose, searchingText = "" }) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="Flight search dialog"
      aria-describedby="Flight search dialog"
    >
      <LinearProgress />
      <DialogTitle>Searching Flights</DialogTitle>
      <DialogContent>
        <Typography>{searchingText}</Typography>
      </DialogContent>
      <LinearProgress />
    </Dialog>
  )
}

export default FlightSearchDialog
