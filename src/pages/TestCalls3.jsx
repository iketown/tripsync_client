import React, { Component } from "react"
import { adopt } from "react-adopt"
import { Query } from "react-apollo"
//
import { flightSearchQ } from "../queries/flights/flightSearch.query"
import { showMe } from "../helpers/showMe"
const variables = {
  input1: {
    origin: "MSP",
    destination: "MCO",
    departDate: "1549391294510",
    returnDate: "1549996113474",
    travelerIds: ["5c4d999074860b172de01adf"]
  },
  input2: {
    origin: "LAX",
    destination: "MCO",
    departDate: "1549391294510",
    returnDate: "1549996113474",
    travelerIds: ["5c4cbdc01f1be00dce856bdd", "5c4d99aa74860b172de01ae0"]
  }
}

const AllQueries = adopt({
  search1: (
    <Query query={flightSearchQ} variables={{ input: variables.input1 }} />
  ),
  search2: (
    <Query query={flightSearchQ} variables={{ input: variables.input2 }} />
  )
})
export class TestCalls3 extends Component {
  render() {
    return (
      <AllQueries>
        {render => {
          const { search1, search2 } = render
          console.log(render)
          if (search1.loading || search2.loading) return <h2>loading...</h2>
          return (
            <div>
              <div>{showMe(search1.data)}</div>
              <hr />
              <div>{showMe(search2.data)}</div>
            </div>
          )
        }}
      </AllQueries>
    )
  }
}

export default TestCalls3
