export const fakeFlightInfo = {
  id: "FLL--1549975450195-1501768285",
  origin: "FLL",
  destination: "MSP",
  price: "257.00",
  travelers: [
    {
      id: "5c51d08fee856c3204fd7c9b",
      firstName: "Bincent",
      lastName: "Johnson",
      photoUrl:
        "https://res.cloudinary.com/homecomp/image/upload/v1545408611/song-detailer/fp5wjfzkh2yn8vzvdtim.jpg",
      __typename: "User"
    }
  ],
  rides: [
    {
      name: "777",
      departureTime: "2019-02-19T20:30:00-05:00",
      arrivalTime: "2019-02-19T22:52:00-08:00",
      company: {
        name: "Spirit Airlines",
        iata: "NK",
        airlineCode: "NK",
        name2: "SPIRIT WINGS",
        __typename: "Company"
      },
      origin: {
        id: "5c5ad56aac3ab378dc81e8e4",
        lat: 26.07147,
        lng: -80.144,
        city: "FT LAUDERDALE",
        state: "FL",
        country: "US",
        name: "FLL INTL",
        airportCode: "FLL",
        __typename: "Location"
      },
      destination: {
        id: "5c5b11c2ac3ab378dc81fc0a",
        lat: 36.08521,
        lng: -115.1507,
        city: "LAS VEGAS",
        state: "NV",
        country: "US",
        name: "MCCARRAN INTERNATIONAL",
        airportCode: "LAS",
        __typename: "Location"
      },
      __typename: "Ride"
    },
    {
      name: "612",
      departureTime: "2019-02-20T01:15:00-08:00",
      arrivalTime: "2019-02-20T06:18:00-06:00",
      company: {
        name: "Spirit Airlines",
        iata: "NK",
        airlineCode: "NK",
        name2: "SPIRIT WINGS",
        __typename: "Company"
      },
      origin: {
        id: "5c5b11c2ac3ab378dc81fc0a",
        lat: 36.08521,
        lng: -115.1507,
        city: "LAS VEGAS",
        state: "NV",
        country: "US",
        name: "MCCARRAN INTERNATIONAL",
        airportCode: "LAS",
        __typename: "Location"
      },
      destination: {
        id: "5c59faafac3ab378dc81b3ee",
        lat: 44.88217,
        lng: -93.20835,
        city: "MINNEAPOLIS/ST PAUL",
        state: "MN",
        country: "US",
        name: "ST PAUL INTL",
        airportCode: "MSP",
        __typename: "Location"
      },
      __typename: "Ride"
    }
  ],
  returnRides: null,
  __typename: "Itinerary",
  lastFlightArrivalTime: "1550665080",
  totalDuration: null
}
