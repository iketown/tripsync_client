export function shorten(airportName) {
  return airportName.replace("International", "Int.").slice(0, 30)
}
