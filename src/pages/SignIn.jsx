import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

function SignIn(wrappedComponent) {
  return (
    <Query>
      {({ loading, error, data }) => {
        console.log("error", error)
      }}
    </Query>
  )
}

export default SignIn
