import React from "react"
import { Field } from "react-final-form"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"

function ReturnTripRadio({ changeOneWay }) {
  return (
    <FormControl>
      <Field name="oneWay">
        {({ input, meta }) => {
          return (
            <RadioGroup
              {...input}
              onChange={e => {
                // set state of parent form to toggle return trip datepicker, etc
                changeOneWay(e.currentTarget.value === "oneWay")
                input.onChange(e)
              }}
            >
              <FormControlLabel
                value={"oneWay"}
                control={<Radio color="primary" />}
                label="One Way"
                labelPlacement="start"
              />
              <FormControlLabel
                value={"roundTrip"}
                control={<Radio color="primary" />}
                label="Round Trip"
                labelPlacement="start"
              />
            </RadioGroup>
          )
        }}
      </Field>
    </FormControl>
  )
}

export default ReturnTripRadio
