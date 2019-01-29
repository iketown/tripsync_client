import React, { Component } from "react"
import { Button, Grid } from "@material-ui/core"
import gql from "graphql-tag"
import { Query, graphql, compose } from "react-apollo"
//
import { showMe } from "../helpers/showMe"
//
const query1 = `
    user(id: "5c4cbdc01f1be00dce856bdd") {
      firstName
      email
    }
`
const query2 = `
    otheruser: user(id: "5c4d999074860b172de01adf") {
      firstName
      email
    }
`
const query3 = gql`
{
  ${query1}
  ${query2}
}
`

const queryString = (uid, i) => `
user${String(i)}: user(id: "${uid}") {
  firstName
  email
}
`

export class Tests2 extends Component {
  state = {
    userIds: [],
    query: gql`
      {
        users
      }
    `,
    ready: false
  }
  updateQuery = () => {
    console.log("updating query", this.state.userIds)
    if (this.state.userIds.length) {
      const parts = this.state.userIds
        .map((uid, i) => queryString(uid, i))
        .join("\n")
      this.setState({ query: gql`{${parts}}` })
    }
  }
  toggleUserId = id => {
    if (this.state.userIds.includes(id)) {
      this.setState(
        { userIds: this.state.userIds.filter(sid => sid !== id) },
        this.updateQuery
      )
    } else {
      this.setState({ userIds: [...this.state.userIds, id] }, this.updateQuery)
    }
  }
  toggleReady = () => {
    this.setState({ ready: !this.state.ready })
  }
  render() {
    return (
      <Grid container>
        <Grid item xs={4}>
          <Button
            onClick={() => this.toggleUserId("5c4cbdc01f1be00dce856bdd")}
            variant={
              this.state.userIds.includes("5c4cbdc01f1be00dce856bdd")
                ? "contained"
                : ""
            }
            color="primary"
          >
            person1
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={() => this.toggleUserId("5c4d999074860b172de01adf")}
            variant={
              this.state.userIds.includes("5c4d999074860b172de01adf")
                ? "contained"
                : ""
            }
            color="primary"
          >
            person2
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={this.toggleReady}
            variant={this.state.ready ? "contained" : ""}
            color="primary"
          >
            READY
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Query query={this.state.query} skip={!this.state.ready}>
            {({ loading, error, data }) => {
              if (loading) return <h3>loading . . .</h3>
              if (error) return <h3>error . . .</h3>
              return (
                <>
                  <h4>the data</h4>
                  {showMe(data)}
                </>
              )
            }}
          </Query>
        </Grid>
      </Grid>
    )
  }
}

export default Tests2
