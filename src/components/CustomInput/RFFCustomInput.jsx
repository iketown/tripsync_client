import React from "react"
// nodejs library to set properties for components
import PropTypes from "prop-types"
// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import { FormHelperText } from "@material-ui/core"
// @material-ui/icons
import Clear from "@material-ui/icons/Clear"
import Check from "@material-ui/icons/Check"
// core components

import customInputStyle from "assets/jss/material-kit-pro-react/components/customInputStyle.jsx"
// react final
import { Field } from "react-final-form"

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    name
  } = props

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  })
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  })
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  })
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  })
  var formControlClasses
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    )
  } else {
    formControlClasses = classes.formControl
  }
  return (
    <Field name={name}>
      {({ input, meta }) => {
        const errorMessage = meta.error || meta.submitError
        return (
          <FormControl
            error={!!meta.error || !!meta.submitError}
            {...formControlProps}
            className={formControlClasses}
          >
            {labelText !== undefined ? (
              <InputLabel
                className={classes.labelRoot + " " + labelClasses}
                htmlFor={id}
                {...labelProps}
              >
                {labelText}
              </InputLabel>
            ) : null}
            <Input
              classes={{
                input: inputClasses,
                root: marginTop,
                disabled: classes.disabled,
                underline: underlineClasses
              }}
              id={id}
              {...inputProps}
              {...input}
            />
            {errorMessage ? (
              <Clear
                className={classes.feedback + " " + classes.labelRootError}
              />
            ) : success ? (
              <Check
                className={classes.feedback + " " + classes.labelRootSuccess}
              />
            ) : null}
            {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
          </FormControl>
        )
      }}
    </Field>
  )
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool
}

export default withStyles(customInputStyle)(CustomInput)
