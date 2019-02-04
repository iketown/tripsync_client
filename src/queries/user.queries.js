import gql from "graphql-tag"

export const AddressInfoFrag = gql`
  fragment AddressInfo on HomeAddress {
    street
    lat
    lng
  }
`

export const UserInfoFrag = gql`
  fragment UserInfo on User {
    id
    firstName
    lastName
    email
    userName
    photoUrl
    homeAddress {
      ...AddressInfo
    }
    homeAirports {
      airportCode
      name
      lat
      lng
    }
    memberships {
      memberNumber
      company {
        name
      }
    }
  }
`

export const FullUserInfoQuery = gql`
  query FULL_USER_INFO($userId: ID!) {
    user(id: $userId) {
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
