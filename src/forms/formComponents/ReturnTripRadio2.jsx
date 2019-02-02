import React from "react"
import { Field } from "react-final-form"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"

function ReturnTripRadio2({ name }) {
  return (
    <FormControl>
      <RadioGroup>
        <Field
          type="radio"
          name="oneWay"
          render={({ input }) => <Radio {...input} />}
          value="oneWay"
        />
        <Field
          type="radio"
          name="oneWay"
          render={({ input }) => <Radio {...input} />}
          value="roundTrip"
        />
      </RadioGroup>
    </FormControl>
  )
}

export default ReturnTripRadio2
