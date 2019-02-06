import React from "react"
import { Form, Field } from "react-final-form"
import { Grid, Button } from "@material-ui/core"
import { Mutation, Query } from "react-apollo"
//
import TextInput from "../../components/ui/TextInput.jsx"
import AddressAutocomplete from "./AddressAutocomplete.jsx"
import { showMe } from "../../helpers/showMe"
import {
  UpdateUserMutation,
  UserFreqAirportQ
} from "../../queries/user.queries.js"

//
//
function UserAddressForm({ trav }) {
  const {
    freqAirports,
    homeAirports,
    memberships,
    id,
    photoUrl,
    __typename,
    ...initialValues
  } = trav

  return (
    <Mutation mutation={UpdateUserMutation}>
      {(mutate, { loading, error, data }) => {
        const handleSubmit = values => {
          const { homeAddress, ...userInfo } = values
          const { __typename, ...homeAddressStripped } = homeAddress
          const variables = {
            input: userInfo,
            homeAddressInput: homeAddressStripped,
            userId: trav.id
          }
          mutate({
            variables,
            refetchQueries: {
              query: UserFreqAirportQ,
              variables: { userId: id }
            }
          })
        }
        return (
          <Form onSubmit={handleSubmit} initialValues={initialValues}>
            {({ values, handleSubmit, pristine, dirty, form }) => {
              return (
                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                  <Grid container spacing={8}>
                    <Grid item xs={12} sm={6}>
                      <AddressAutocomplete
                        name="homeAddress.street"
                        label="Home Address"
                        change={form.change}
                        initAddress={initialValues.homeAddress.street}
                      />
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

                    <Grid item xs={12} style={{ textAlign: "right" }}>
                      <Button
                        disabled={pristine}
                        color={dirty ? "primary" : "default"}
                        onClick={handleSubmit}
                        variant="contained"
                      >
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
