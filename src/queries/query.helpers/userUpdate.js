import { UserInfoFrag } from "../user.queries"

export function userUpdateFragmentInfo(userId) {
  // feed this into query.readFragment in the 'update' function after mutation
  return {
    fragment: UserInfoFrag,
    fragmentName: "UserInfo",
    id: `User:${userId}`
  }
}
