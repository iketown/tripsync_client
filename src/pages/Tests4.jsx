import React, { useState } from "react"
import { Button } from "@material-ui/core"
import { Query, Mutation } from "react-apollo"
import { showMe } from "../helpers/showMe"
import gql from "graphql-tag"
import { TRAVELERS_ORIGINS } from "../queries/local.queries"

export const FAKE_BAR_QUERY = gql`
  query FAKE_BAR_QUERY {
    bar @client {
      isCool
    }
  }
`

export const TOGGLE_BAR = gql`
  mutation TOGGLE_BAR {
    toggleBar @client {
      isCool
    }
  }
`

export const FOOS_QUERY = gql`
  query FOOS_QUERY {
    foos @client {
      name
      price
      id
    }
  }
`

export const SINGLE_FOO_QUERY = gql`
  query SINGLE_FOO_QUERY($price: String) {
    singleFoo(price: $price) @client {
      name
      price
      id
    }
  }
`

const ADD_FOO = gql`
  mutation ADD_FOO($price: Int) {
    addFoo(price: $price) @client {
      id
      price
    }
  }
`

function Tests4() {
  const [price, setPrice] = useState(0)
  return (
    <>
      <Query query={SINGLE_FOO_QUERY} variables={{ price: "65" }}>
        {({ data, error }) => {
          if (data) console.log("data in single foo query", data)
          return (
            <div>
              <h3>singleFoo q</h3>
              {showMe(data, "singlefoo query")}
            </div>
          )
        }}
      </Query>
      <Query query={FOOS_QUERY}>
        {({ data }) => {
          return (
            <div>
              <Mutation mutation={ADD_FOO}>
                {(addFoo, { data }) => {
                  return (
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          addFoo({
                            variables: { price },
                            refetchQueries: [
                              { query: SINGLE_FOO_QUERY, variables: { price } }
                            ]
                          })
                        }
                      >
                        Add Foo
                      </Button>
                      <input
                        type="text"
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>
                  )
                }}
              </Mutation>
              <h5>foos</h5>
              {showMe(data, "Foos")}
            </div>
          )
        }}
      </Query>
      <Query query={FAKE_BAR_QUERY}>
        {({ loading, error, data }) => {
          return (
            <div>
              <h3>Query results</h3>
              <div>
                <Mutation mutation={TOGGLE_BAR}>
                  {(toggleIt, { loading, error, data }) => {
                    return <Button onClick={toggleIt}>toggggle</Button>
                  }}
                </Mutation>
              </div>
              <div>{showMe(data)}</div>
            </div>
          )
        }}
      </Query>
      <Query query={TRAVELERS_ORIGINS}>
        {({ loading, error, data }) => {
          return (
            <div>
              <h5>travelers origins</h5>
              {showMe(data)}
            </div>
          )
        }}
      </Query>
    </>
  )
}

export default Tests4
