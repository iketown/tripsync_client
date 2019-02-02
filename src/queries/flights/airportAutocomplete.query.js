import gql from "graphql-tag"

export const airportAutocompleteQ = gql`
  query AP_AUTOCOMPLETE($searchText: String!, $limit: Int) {
    airportAutocomplete(searchText: $searchText, limit: $limit) {
      name
      airportCode
      city
      lat
      lng
    }
  }
`
