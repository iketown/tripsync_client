import React, { useState } from "react"
import { Form, Field } from "react-final-form"
import {
  Grid,
  Button,
  Typography,
  IconButton,
  LinearProgress
} from "@material-ui/core"
import { Mutation, Query } from "react-apollo"
//
import TextInput from "../../components/ui/TextInput.jsx"
import AddressAutocomplete from "./AddressAutocomplete.jsx"
import { showMe } from "../../helpers/showMe"
import { CreateTravelerMutation } from "../../queries/user.queries.js"
import { MyTravelersIds } from "../../queries/me.queries"
import { RemoveCircleOutline, Edit, RemoveCircle } from "@material-ui/icons"

//
//
function NewTravelerForm() {
  const [showForm, setShowForm] = useState(false)
  function validate(values) {
    console.log("validating", values)
    const errors = {}
    if (!values.email) errors.email = "Please Provide an email"
    return errors
  }
  const buttonOnly = (
    <Grid container justify="center" alignItems="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(true)}
      >
        Add New Traveler
      </Button>
    </Grid>
  )
  const newTravForm = (
    <Mutation
      mutation={CreateTravelerMutation}
      refetchQueries={[{ query: MyTravelersIds }]}
    >
      {(createTraveler, { loading, error, data }) => {
        console.log("loading,", loading)
        console.log("data", data)
        const onSubmit = async values => {
          const { homeAddress, ...userInfo } = values
          const variables = {
            input: userInfo,
            homeAddressInput: homeAddress
          }
          await createTraveler({
            variables
          })
          setShowForm(false)
        }
        return (
          <Form onSubmit={onSubmit} validate={validate}>
            {({ handleSubmit, pristine, dirty, reset, form, invalid }) => {
              return (
                <form
                  style={{ width: "100%" }}
                  onSubmit={async event => {
                    const error = await handleSubmit(event)
                    console.log("error?", error)
                    if (error) return error
                    reset()
                  }}
                >
                  <Grid container spacing={8}>
                    <Grid item xs={12} sm={6}>
                      <TextInput
                        name="firstName"
                        placeholder="First Name"
                        label="First Name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextInput
                        name="lastName"
                        placeholder="Last Name"
                        label="Last Name"
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <AddressAutocomplete
                        name="homeAddress.street"
                        label="Home Address"
                        change={form.change}
                        initAddress={""}
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <TextInput
                        name="email"
                        placeholder="person@example.net"
                        label="Email"
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <TextInput name="phoneNumber" label="Phone #" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextInput
                        name="phoneNumber2"
                        label="Phone # (alternate)"
                      />
                    </Grid> */}

                    <Grid item xs={12} style={{ textAlign: "right" }}>
                      <Button
                        onClick={() => setShowForm(false)}
                        color="default"
                        variant="outlined"
                      >
                        CANCEL
                      </Button>
                      <Button
                        disabled={pristine || invalid}
                        color={dirty ? "primary" : "default"}
                        onClick={handleSubmit}
                        variant="contained"
                      >
                        SAVE
                      </Button>
                      <Button onClick={form.reset}>reset</Button>
                    </Grid>
                  </Grid>
                </form>
              )
            }}
          </Form>
        )
      }}
    </Mutation>
  )
  return showForm ? newTravForm : buttonOnly
}

export default NewTravelerForm
