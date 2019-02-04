import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import styled from "styled-components"
//
import NavBar from "../components/NavBar"
//
import Flights from "./Flights.jsx"
import TestCalls from "./TestCalls"
import Home from "./index"
import Tests2 from "./Tests2"
import MyTravelers from "./MyTravelers"

const Container = styled.div`
  margin: 8px;
  ${p =>
    p.showGrid &&
    `.MuiGrid-item-142 {
      border: blue dotted 1px;
    }
    .MuiGrid-container-141 {
      border: red dotted 1px;
    }`}
`

export class App extends Component {
  state = { showGrid: false }
  handleGridToggle = () => {
    this.setState({ showGrid: !this.state.showGrid })
  }
  render() {
    return (
      <Router>
        <>
          <NavBar
            toggleGrid={this.handleGridToggle}
            showGrid={this.state.showGrid}
          />
          <Container showGrid={this.state.showGrid}>
            <Route path="/amadeus" component={TestCalls} />
            <Route path="/test2" component={Tests2} />
            <Route path="/flights" component={Flights} />
            <Route path="/travelers" component={MyTravelers} />
            <Route path="/" exact component={Home} />
          </Container>
        </>
      </Router>
    )
  }
}

export default App
