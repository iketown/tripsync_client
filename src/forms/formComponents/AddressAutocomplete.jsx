import React, { Component } from "react"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete"
import { TextField, Typography, MenuItem } from "@material-ui/core"
import { Field } from "react-final-form"

class LocationSearchInput extends Component {
  state = {
    address: ""
  }
  componentDidMount() {
    const address = this.props.initAddress
    this.setState({ address })
  }
  handleChange = address => {
    this.setState({ address })
  }

  handleSelect = async address => {
    try {
      this.setState({ address })
      const fullResults = await geocodeByAddress(address)
      const { lat, lng } = await getLatLng(fullResults[0])
      this.props.change("homeAddress", { street: address, lat, lng })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { label, value, name } = this.props
    return (
      <Field name={name}>
        {({ input, meta }) => {
          return (
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => {
                return (
                  <div>
                    <TextField
                      label={label}
                      placeholder="enter address . . ."
                      inputProps={{
                        ...getInputProps({
                          className: "location-search-input"
                        })
                      }}
                      InputLabelProps={{ shrink: !!this.state.address }}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, i) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item"
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" }
                        console.log(
                          "sug item props",
                          getSuggestionItemProps(suggestion)
                        )
                        return (
                          <MenuItem
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <div>
                              <Typography component="div">
                                {suggestion.formattedSuggestion.mainText}
                              </Typography>
                              <Typography
                                variant="caption"
                                component="div"
                                color="textSecondary"
                              >
                                {suggestion.formattedSuggestion.secondaryText}
                              </Typography>
                            </div>
                          </MenuItem>
                        )
                      })}
                    </div>
                  </div>
                )
              }}
            </PlacesAutocomplete>
          )
        }}
      </Field>
    )
  }
}

export default LocationSearchInput
