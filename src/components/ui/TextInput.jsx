import React from "react"
import { Field } from "react-final-form"
import TextField from "@material-ui/core/TextField"
import PropTypes from "prop-types"

const TextInput = ({
  name,
  label,
  placeholder,
  password,
  width,
  id,
  autoComplete
}) => {
  return (
    <Field name={name}>
      {({ input, meta }) => {
        const errorBool = meta.error || meta.submitError
        return (
          <TextField
            helperText={
              meta.touched &&
              errorBool && <span>{meta.error || meta.submitError}</span>
            }
            {...input}
            error={(meta.touched && meta.error) || !!meta.submitError}
            label={label}
            placeholder={placeholder || label}
            type={password ? "password" : "text"}
            style={{ width }}
            id={id}
            autoComplete={autoComplete}
          />
        )
      }}
    </Field>
  )
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  password: PropTypes.bool
}

export default TextInput
