const yargs = require("yargs").option("locations", {
  type: "array",
  desc: "One or more locations",
});
const axios = require("axios").default;
const { apiKey } = require("./config");
const errorMessage =
  "Bad Locations, please ensure you're providing a valid locations argument";
let argv = yargs.argv;
let locations = argv.locations;

if (locations.length > 0) {
  console.log(`These are all of the locations submitted: ${locations}`);
  for (location of locations) {
    // Change location to string in order to get length to check if it's a zipcode
    let stringifiedLocation = location.toString();
    let url;
    // If location is valid zip-code
    if (typeof (location === "number") && stringifiedLocation.length === 5) {
      console.log(`${location} is zip code`);
      url = `http://api.openweathermap.org/geo/1.0/zip?zip=${location},US&appid=${apiKey}`;
      console.log(url);
    }
    // if location is valid city/state
    else if (typeof (location === "string") && isCityStateFormat(location)) {
      console.log(`${location} is a valid city / state input`);
      let sanitizedLocation = location.replace(/\s+/g, "");
      let city = sanitizedLocation.split(",")[0];
      let state = sanitizedLocation.split(",")[1];

      url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=1&appid=${apiKey}`;
      console.log(url);
    } else {
      console.error(`${location} is an invalid location.`);
    }

    axios.get(url).then((response) => {
      console.log(`${location} data:
            Lat: ${response.lat}
            Long:  ${response.long}`);
      if (response.name) {
        console.log(`Name: ${response.name}`);
      }
    });
  }
} else {
  console.error(errorMessage);
}

function isCityStateFormat(input) {
  // Regular expression for "text, text" format
  const regex = /^[a-zA-Z\s]+,\s*[a-zA-Z\s]+$/;

  return regex.test(input);
}

// I need a function that goes through each location to ensure they're a valid location...

// It must either have 5 numbers OR it must have a piece of text, with a comma, then another location.

// If something doesn't match, output an error stating the problem 'location'

// parse locations
// if (country) {
// } else {
//   console.log("Please enter a country");
// }

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=${apiKey}
