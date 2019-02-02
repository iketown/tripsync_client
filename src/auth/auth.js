export function signInWithJWT(jwt) {
  localStorage.setItem("auth-token", jwt)
  localStorage.setItem("signed-in", true)
}
export function signOut() {
  localStorage.removeItem("auth-token")
  localStorage.removeItem("signed-in")
}
