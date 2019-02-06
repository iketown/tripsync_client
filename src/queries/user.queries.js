import gql from "graphql-tag"

export const AddressInfoFrag = gql`
  fragment AddressInfo on HomeAddress {
    street
    lat
    lng
  }
`

export const LocationInfoFrag = gql`
  fragment LocationInfo on Location {
    airportCode
    id
    name
    city
    state
    country
    lat
    lng
  }
`

export const UserFreqAirportQ = gql`
  query USER_FREQ_AP($userId: ID!) {
    user(id: $userId) {
      freqAirports {
        id
        use
        notes
        location {
          ...LocationInfo
        }
      }
    }
  }
  ${LocationInfoFrag}
`

export const UserInfoFrag = gql`
  fragment UserInfo on User {
    id
    firstName
    lastName
    email
    userName
    photoUrl
    phoneNumber
    phoneNumber2
    homeAddress {
      ...AddressInfo
    }
    freqAirports {
      id
      use
      location {
        ...LocationInfo
      }
    }
    memberships {
      memberNumber
      company {
        name
      }
    }
  }
  ${LocationInfoFrag}
`

export const FullUserInfoQuery = gql`
  query FULL_USER_INFO($userId: ID!) {
    fullUserInfo: user(id: $userId) {
      ...UserInfo
    }
  }
  ${AddressInfoFrag}
  ${UserInfoFrag}
`

export const UpdateUserMutation = gql`
  mutation UPDATE_USER(
    $input: UserInput
    $homeAddressInput: HomeAddressInput
    $userId: ID!
  ) {
    updateUser(
      input: $input
      homeAddressInput: $homeAddressInput
      userId: $userId
    ) {
      ...UserInfo
    }
  }
  ${AddressInfoFrag}
  ${UserInfoFrag}
`

export const UpdateAdminLoc = gql`
  mutation UPDATE_ADMIN_LOC($input: AdminLocInput!) {
    updateAdminLoc(input: $input) {
      id
      notes
      use
    }
  }
`

export const AdminLocInfoFrag = gql`
  fragment AdminLocInfo on AdminLoc {
    id
    notes
    use
    location {
      ...LocationInfo
    }
  }
  ${LocationInfoFrag}
`

export const AddFreqAirport = gql`
  mutation ADD_FREQ_AP($userId: ID!, $airportCode: String!) {
    newFreqAirport: addFreqAirport(userId: $userId, airportCode: $airportCode) {
      ...AdminLocInfo
    }
  }
  ${AdminLocInfoFrag}
`

export const RemoveFreqAirport = gql`
  mutation REMOVE_FREQ_AP($userId: ID!, $adminLocId: ID!) {
    removeFreqAirport(userId: $userId, adminLocId: $adminLocId)
  }
`
