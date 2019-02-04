import React, { Component } from "react"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete"
import { TextField, Typography, MenuItem } from "@material-ui/core"
class LocationSearchInput extends Component {
  state = {
    address: ""
  }
  componentDidMount() {
    const address = this.props.addressInfo && this.props.addressInfo.street
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
      this.props.onChange({ street: address, lat, lng })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { label, value, addressInfo } = this.props
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
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
  }
}

export default LocationSearchInput
