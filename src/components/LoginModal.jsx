import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { Form } from "react-final-form"
import TextInput from "./ui/TextInput"
export default function LoginModal({ open, handleClose }) {
  function handleLogin(values) {
    console.log("values", values)
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <Form onSubmit={handleLogin}>
          {({ handleSubmit, pristine, invalid }) => {
            return (
              <>
                <DialogContent>
                  <DialogContentText>Please Login</DialogContentText>
                  <form onSubmit={handleSubmit}>
                    <TextInput name="email" label="Email" />
                    <TextInput password name="password" label="Password" />
                    <Button type="submit">Login</Button>
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
      </Dialog>
    </div>
  )
}
