export function shorten(airportName) {
  if (!airportName) return ""
  return airportName.replace("International", "Int.").slice(0, 30)
}
