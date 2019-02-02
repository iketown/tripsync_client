import React from "react"
import { InlineDatePicker } from "material-ui-pickers"
import { Field } from "react-final-form"

function DatePicker({ name, label }) {
  return (
    <Field name={name}>
      {({ input, meta }) => {
        return <InlineDatePicker {...input} label={label} />
      }}
    </Field>
  )
}

export default DatePicker
