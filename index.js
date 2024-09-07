const { buildUrl } = require("./utils");
const axios = require("axios").default;
const yargs = require("yargs").option("locations", {
  type: "array",
  desc: "One or more locations",
});
const { apiKey } = require("./config");

const locations = yargs.argv.locations || [];

if (locations.length === 0) {
  console.error(
    "Bad Locations, please ensure you're providing a valid locations argument"
  );
  process.exit(1);
}

console.log(`These are all of the locations submitted: ${locations}`);

// Function to fetch and print location data
async function fetchLocationData(location) {
  try {
    const url = buildUrl(location, apiKey);
    console.log(url);
    const response = await axios.get(url);
    const data = response.data;
    if (data.length > 0) {
      const locationData = data[0]; // Access the first result in the array
      printData(locationData);
    } else if (data.message === undefined) {
      printData(data);
    } else {
      console.error(`No data found for ${location}`);
    }
  } catch (error) {
    console.error(`Error fetching data for ${location}: ${error.message}`);
  }
}

(async function processLocations() {
  for (const location of locations) {
    await fetchLocationData(location);
  }
})();

function printData(data) {
  console.log(`Location data:
Lat: ${data.lat}
Long: ${data.lon}`);

  if (data.name) {
    console.log(`Name: ${data.name}`);
  }
}
