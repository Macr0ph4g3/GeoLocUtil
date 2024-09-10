const axios = require("axios").default;
const { buildUrl } = require("../Utilities/utils");
const { apiKey } = require("../config");

async function fetchLocationData(location) {
  try {
    const url = buildUrl(location, apiKey);
    const response = await axios.get(url);
    const data = response.data;

    if (data.length > 0) {
      const locationData = data[0];
      if (locationData.name === "undefined") {
        throw new Error("Invalid Location");
      }
      printData(locationData);
      let usefulData = {
        name: locationData.name,
        latitude: locationData.lat,
        longitude: locationData.lon,
      };
      return usefulData;
    } else if (data.name != undefined) {
      printData(data);
      let usefulData = {
        name: data.name,
        latitude: data.lat,
        longitude: data.lon,
      };
      return usefulData;
    } else {
      throw new Error("Invalid Location");
    }
  } catch (error) {
    throw error;
  }
}

function printData(data) {
  console.log(`Location data: ${data.name}
Lat: ${data.lat}
Long: ${data.lon}`);
}
// Order of operations is fetchLocationData -> Build Valid URL(utils.js buildUrl) -> Check Response for valid data -> Print Data to console.
async function processLocations(locations) {
  return await fetchLocationData(locations);
}

module.exports = { fetchLocationData, printData, processLocations };
