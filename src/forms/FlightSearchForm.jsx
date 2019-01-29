import React from "react"
import { Form, Field } from "react-final-form"
import {
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@material-ui/core"
import TextInput from "../components/ui/TextInput.jsx"
import { DatePicker, InlineDatePicker } from "material-ui-pickers"
import addDays from "date-fns/addDays"
//
import { showMe } from "../helpers/showMe"

function FlightSearchForm({ onSubmit }) {
  const initialValues = {
    departDate: addDays(new Date(), 7),
    returnDate: addDays(new Date(), 14),
    oneWay: "roundTrip",
    origin1: "msp",
    origin2: "ord",
    // origin3: "sea",
    destination: "lax"
  }
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            {showMe(values)}
            <Grid container>
              <Grid item container xs={6}>
                <Grid item xs={12}>
                  <TextInput
                    label="From"
                    name="origin1"
                    placeholder="Departure airport"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    label="From"
                    name="origin2"
                    placeholder="Departure airport 2"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    label="From"
                    name="origin3"
                    placeholder="Departure airport 3"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    label="From"
                    name="origin4"
                    placeholder="Departure airport 3"
                  />
                </Grid>
              </Grid>
              <Grid item container xs={6}>
                <Grid item xs={12}>
                  <TextInput
                    label="To"
                    name="destination"
                    placeholder="Arrival airport"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Field name="departDate">
                  {({ input, meta }) => (
                    <InlineDatePicker {...input} label="Departure Date" />
                  )}
                </Field>
              </Grid>
              {values.oneWay === "roundTrip" && (
                <Grid item xs={12}>
                  <Field name="returnDate">
                    {({ input, meta }) => (
                      <InlineDatePicker {...input} label="Return Date" />
                    )}
                  </Field>
                </Grid>
              )}
              <Grid item xs={12}>
                <Field name="oneWay" type="radio">
                  {({ input, meta }) => (
                    <FormControl component="fieldset">
                      {/* <FormLabel component="legend">Gender</FormLabel> */}
                      <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        //   className={classes.group}
                        {...input}
                      >
                        <FormControlLabel
                          value="oneWay"
                          control={<Radio />}
                          label="One Way"
                        />
                        <FormControlLabel
                          value="roundTrip"
                          control={<Radio />}
                          label="Round Trip"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  GO!
                </Button>{" "}
              </Grid>
            </Grid>
          </form>
        )
      }}
    </Form>
  )
}

export default FlightSearchForm
