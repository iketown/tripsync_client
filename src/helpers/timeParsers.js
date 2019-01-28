function getSeconds(string) {
  const arr = string.split("")
  const Di = arr.findIndex(char => char === "D")
  const Ti = arr.findIndex(char => char === "T")
  const Hi = arr.findIndex(char => char === "H")
  const Mi = arr.findIndex(char => char === "M")
  let seconds = 0
  const minutes = arr.slice(Hi + 1, Mi).join("")
  const hours = arr.slice(Ti + 1, Hi).join("")
  const days = arr.slice(0, Di).join("")
  seconds += days * 24 * 60 * 60
  seconds += minutes * 60
  seconds += hours * 60 * 60
  seconds += days * 60 * 60 * 24
  return seconds
}

function getDuration(string) {
  const seconds = getSeconds(string)
  const hrs = Math.floor(seconds / (60 * 60))
  const mins = (seconds - hrs * 60 * 60) / 60
  return { hrs, mins }
}

module.exports = { getSeconds, getDuration }
