import React from "react";
import { Field } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const TextInput = ({ name, label, placeholder, password }) => {
  return (
    <Field name={name}>
      {({ input, meta }) => {
        return (
          <TextField
            helperText={meta.touched && meta.error && <span>{meta.error}</span>}
            {...input}
            error={meta.touched && meta.error}
            label={label}
            placeholder={placeholder || label}
            type={password ? "password" : "text"}
          />
        );
      }}
    </Field>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  password: PropTypes.bool
};

export default TextInput;
