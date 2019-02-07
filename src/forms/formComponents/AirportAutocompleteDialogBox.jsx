import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { FormControlLabel, Checkbox } from "@material-ui/core"
import AirportAutocomplete from "./AirportAutocomplete.jsx"

//
//
function AirportAutocompleteDialogBox({
  open,
  setAirportACBoxOpen,
  firstName,
  lastName,
  userId
}) {
  function handleClose() {
    setAirportACBoxOpen(false)
  }
  function handleSelectedAirport(ap) {
    setSelectedAirport(ap)
    console.log("selected ap", ap)
  }
  function handleCheckBox(e) {
    setAddToList(e.target.checked)
  }

  const [selectedAirport, setSelectedAirport] = useState({})
  const [addToList, setAddToList] = useState(true)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Add Airport</DialogTitle>
      <DialogContent>
        {/* <Grid container> */}
        <AirportAutocomplete
          autoFocus
          handleSelectedAirport={handleSelectedAirport}
          skipConfirmationButton
        />
        {/* </Grid> */}
      </DialogContent>
      <DialogActions
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <div>
          {selectedAirport.airportCode && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={addToList}
                  onChange={handleCheckBox}
                  value="addToList"
                  color="primary"
                />
              }
              label={`Add ${
                selectedAirport.airportCode
              } to ${firstName}'s airports`}
            />
          )}
          {/* <Mutation variables={}>
            {confirmAirport => {
  function handleConfirmButton(){
    if(addToList) confirmAirport()
  }
          return <Button
            disabled={!selectedAirport.airportCode}
            onClick={handleConfirmButton}
            color="primary"
            variant={selectedAirport.airportCode && "contained"}
          >
            Select
            {selectedAirport.airportCode && ` ${selectedAirport.airportCode}`}
          </Button>
            }}
          </Mutation> */}
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default AirportAutocompleteDialogBox
