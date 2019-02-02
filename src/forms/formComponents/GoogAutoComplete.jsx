import React, { Component } from "react"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete"
import { Input } from "@material-ui/core"

//
export default class LocationSearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = { address: "" }
  }

  handleChange = address => {
    this.setState({ address })
  }

  handleSelect = address => {
    console.log("address", address)
    geocodeByAddress(address)
      .then(results => console.log(results))
      // .then(results => getLatLng(results[0]))
      // .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error))
  }

  render() {
    const searchOptions = {
      types: ["establishment"]
    }
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
        shouldFetchSuggestions={this.state.address.length > 2}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item"
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}
