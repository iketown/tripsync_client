import React, { Component } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from "@material-ui/core"
import { Form } from "react-final-form"

import { Query } from "react-apollo"
//
import TextInput from "./ui/TextInput"
import { showMe } from "../helpers/showMe"
import { signInQ } from "../queries/me.queries"
import { signInWithJWT } from "../auth/auth"
import axios from "axios"
//

class LoginModal extends Component {
  handleLogin = async values => {
    const { data, errors } = await axios
      .post(process.env.REACT_APP_GRAPHQL_URL, {
        query: signInQ,
        variables: values
      })
      .then(res => res.data)
    if (data.signIn) {
      const { jwt } = data.signIn
      signInWithJWT(jwt)
      this.props.handleClose()
    }
    if (errors) {
      const errorObj = errors[0].extensions.exception
      return errorObj
    }
  }
  sendQuery = () => {
    this.setState({ ready: true })
  }

  render() {
    const { open, handleClose } = this.props
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <Form onSubmit={this.handleLogin}>
            {({ handleSubmit, pristine, invalid, submitErrors }) => {
              return (
                <>
                  <DialogContent>
                    <form onSubmit={handleSubmit}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            style={{
                              color: "#D32F2F",
                              marginBottom: "1rem"
                            }}
                          >
                            error message goes here
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <DialogContentText>Please Login</DialogContentText>
                        </Grid>
                        <Grid item xs={12} container>
                          <Grid item xs={6}>
                            <TextInput
                              name="email"
                              label="Email"
                              autoComplete="email"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextInput
                              password
                              name="password"
                              label="Password"
                              autoComplete="current-password"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                      Login
                    </Button>
                  </DialogActions>
                </>
              )
            }}
          </Form>
          )
        </Dialog>
      </div>
    )
  }
}

export default LoginModal
