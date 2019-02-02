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
import { ArcherContainer, ArcherElement } from "react-archer"
import { RightArrowElement } from "./Arrows"

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
          <ArcherContainer
            strokeColor="grey"
            strokeWidth="1"
            arrowThickness="5"
          >
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item container xs={6} style={{ textAlign: "center" }}>
                  <Grid item xs={12}>
                    <RightArrowElement id="origin1" pointTo="destination1">
                      <TextInput
                        label="From"
                        name="origin1"
                        placeholder="Departure airport"
                        width="4rem"
                      />
                    </RightArrowElement>
                  </Grid>
                  <Grid item xs={12}>
                    <RightArrowElement id="origin2" pointTo="destination1">
                      <TextInput
                        label="From"
                        name="origin2"
                        placeholder="Departure airport 2"
                        width="4rem"
                        id="origin2"
                      />
                    </RightArrowElement>
                  </Grid>
                  <Grid item xs={12}>
                    <RightArrowElement id="origin3" pointTo="destination1">
                      <TextInput
                        label="From"
                        name="origin3"
                        placeholder="Departure airport 3"
                        width="4rem"
                        id="origin3"
                      />
                    </RightArrowElement>
                  </Grid>
                  <Grid item xs={12}>
                    <RightArrowElement id="origin4" pointTo="destination1">
                      <TextInput
                        label="From"
                        name="origin4"
                        placeholder="Departure airport 3"
                        width="4rem"
                        id="origin4"
                      />
                    </RightArrowElement>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  justify="center"
                  alignContent="center"
                >
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <RightArrowElement id="destination1">
                      <TextInput
                        label="To"
                        name="destination"
                        placeholder="Arrival airport"
                        width="4rem"
                      />
                    </RightArrowElement>
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
              {showMe(values)}
            </form>
          </ArcherContainer>
        )
      }}
    </Form>
  )
}

export default FlightSearchForm
