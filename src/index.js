import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import App from "./pages/App"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks"
import { MuiPickersUtilsProvider } from "material-ui-pickers"
import { MuiThemeProvider } from "@material-ui/core"
import { MuiTheme } from "./paperbase/paperbaseTheme"
import DateFnsUtils from "@date-io/date-fns"
import "./styles.css"
import { defaults } from "./pages/resolvers/defaults"
import { resolvers } from "./pages/resolvers/resolvers"
import { typeDefs } from "./pages/resolvers/schema"

const headers = {
  authorization: localStorage.getItem("auth-token") || "",
  refresh: localStorage.getItem("refresh-token") || ""
}
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  request: operation => operation.setContext({ headers }),
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
})

const TripSyncApp = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <MuiThemeProvider theme={MuiTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>
)

ReactDOM.render(<TripSyncApp />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
