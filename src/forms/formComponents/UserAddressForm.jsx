import React from "react"
import { Form, Field } from "react-final-form"
import { Grid, Button } from "@material-ui/core"
import { Mutation, Query } from "react-apollo"
//
import TextInput from "../../components/ui/TextInput.jsx"
import AddressAutocomplete from "./AddressAutocomplete.jsx"
import { showMe } from "../../helpers/showMe"
import { UpdateUserMutation } from "../../queries/user.queries.js"

//
//
function UserAddressForm({ trav }) {
  const { homeAirports, memberships, id, photoUrl, ...initialValues } = trav
  const addressInfo = initialValues.homeAddress
  initialValues.homeAddress = addressInfo.street

  return (
    <Mutation mutation={UpdateUserMutation}>
      {(mutate, { loading, error, data }) => {
        console.log("data in mutation", data)
        const handleSubmit = values => {
          console.log("values", values)
          const { homeAddress, ...userInfo } = values
          const variables = {
            input: userInfo,
            homeAddressInput: homeAddress,
            userId: trav.id
          }
          console.log("variables", variables)
          mutate({ variables })
        }
        return (
          <Form onSubmit={handleSubmit} initialValues={initialValues}>
            {({ values, handleSubmit }) => {
              return (
                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                  <Grid container spacing={8}>
                    <Grid item xs={12} sm={6}>
                      <Field name="homeAddress">
                        {({ input, meta }) => {
                          return (
                            <AddressAutocomplete
                              onChange={input.onChange}
                              // value={input.value}
                              label="Home Address"
                              addressInfo={addressInfo}
                            />
                          )
                        }}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextInput
                        name="email"
                        placeholder="person@example.net"
                        label="Email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextInput name="phoneNumber" label="Phone #" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextInput
                        name="phoneNumber2"
                        label="Phone # (alternate)"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      {showMe(values, "VALUES")}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button onClick={handleSubmit} variant="contained">
                        SAVE
                      </Button>
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
}

export default UserAddressForm
