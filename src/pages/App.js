import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import TestCalls from "./TestCalls"
import Home from "./index"
export class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route path="/amadeus" component={TestCalls} />
          <Route path="/" exact component={Home} />
        </>
      </Router>
    )
  }
}

export default App
