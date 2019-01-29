import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import TestCalls from "./TestCalls"
import TestCalls3 from "./TestCalls3.jsx"
import Home from "./index"
import Tests2 from "./Tests2"
export class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route path="/amadeus" component={TestCalls} />
          <Route path="/test2" component={Tests2} />
          <Route path="/test3" component={TestCalls3} />
          <Route path="/" exact component={Home} />
        </>
      </Router>
    )
  }
}

export default App
