import React, { useState } from "react"
import { Form, Field } from "react-final-form"
import {
  Grid,
  Button,
  Typography,
  IconButton,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core"
import { Mutation, Query } from "react-apollo"
//
import TextInput from "../../components/ui/TextInput.jsx"
import AddressAutocomplete from "./AddressAutocomplete.jsx"
import { showMe } from "../../helpers/showMe"
import {
  UpdateUserMutation,
  UserFreqAirportQ,
  DeleteUserMutation
} from "../../queries/user.queries.js"
import { MyTravelersIds } from "../../queries/me.queries"
import { RemoveCircleOutline, Edit, RemoveCircle } from "@material-ui/icons"

//
//
function UserAddressForm({ trav }) {
  const {
    freqAirports,

    memberships,
    id,
    photoUrl,
    __typename,
    ...initialValues
  } = trav
  const [editing, setEditing] = useState(false)
  const [showDeleteMessage, setShowDeleteMessage] = useState(false)
  const DeleteMessage = (
    <Dialog
      open={showDeleteMessage}
      onClose={() => setShowDeleteMessage(false)}
      aria-labelledby="Delete User ?"
    >
      <DialogTitle>
        {`Remove Traveler ${trav.firstName ? trav.firstName : ""} ${
          trav.lastName ? trav.lastName : ""
        }?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {trav.firstName} will be completely removed from the system.
        </DialogContentText>
      </DialogContent>
      <Mutation
        mutation={DeleteUserMutation}
        variables={{ userId: trav.id }}
        update={(proxy, returnedData) => {
          const data = proxy.readQuery({ query: MyTravelersIds })
          console.log("data in update", data)
          console.log("returnedData", returnedData)
          const newAdminTravelers = data.myTravelersIds.adminTravelers.filter(
            adminTrav => adminTrav.id !== returnedData.data.deleteUser
          )
          data.myTravelersIds.adminTravelers = newAdminTravelers
          proxy.writeQuery({ query: MyTravelersIds, data })
        }}
      >
        {(removeUserMutation, data) => {
          return (
            <DialogActions>
              <Button
                onClick={() => setShowDeleteMessage(false)}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={removeUserMutation}
              >
                Remove
              </Button>
            </DialogActions>
          )
        }}
      </Mutation>
    </Dialog>
  )
  const UserForm = (
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
          setEditing(false)
        }
        console.log("loading", loading)
        return (
          <Form onSubmit={handleSubmit} initialValues={initialValues}>
            {({ values, handleSubmit, pristine, dirty, form }) => {
              return (
                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
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
                        color="default"
                        variant="outlined"
                        onClick={() => setEditing(false)}
                      >
                        CANCEL
                      </Button>
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
  const UserDisplay = (
    <>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h6">
            {trav.firstName} {trav.lastName}
          </Typography>
          <Typography variant="body2">
            {trav.homeAddress && trav.homeAddress.street}
          </Typography>
          <Typography variant="body2">{trav.email}</Typography>
          {trav.phoneNumber && (
            <Typography color="textSecondary">{trav.phoneNumber}</Typography>
          )}
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end"
          }}
        >
          <IconButton
            variant="outlined"
            onClick={() => setShowDeleteMessage(true)}
          >
            <RemoveCircle color="error" />
          </IconButton>
          <IconButton variant="outlined" onClick={() => setEditing(true)}>
            <Edit color="action" />
          </IconButton>
        </Grid>
      </Grid>
      {showDeleteMessage && DeleteMessage}
    </>
  )
  return editing ? UserForm : UserDisplay
}

export default UserAddressForm
