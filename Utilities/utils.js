function isValidZip(location) {
  return /^\d{5}$/.test(location.toString());
}

function isCityStateFormat(location) {
  // Updated regex to handle special characters and spaces more robustly
  const regex = /^[a-zA-Z\s\u00C0-\u00FF]+,\s*[a-zA-Z\s\u00C0-\u00FF]+$/;
  return regex.test(location.trim());
}

function buildUrl(location, apiKey) {
  let stringifiedLocation = location.toString();
  if (isValidZip(stringifiedLocation)) {
    return `http://api.openweathermap.org/geo/1.0/zip?zip=${encodeURIComponent(
      stringifiedLocation
    )},US&appid=${apiKey}`;
  } else if (isCityStateFormat(stringifiedLocation)) {
    const [city, state] = stringifiedLocation.split(",");
    const encodedCity = encodeURIComponent(city.trim());
    const encodedState = encodeURIComponent(state.trim());
    return `http://api.openweathermap.org/geo/1.0/direct?q=${encodedCity},${encodedState},US&limit=1&appid=${apiKey}`;
  } else {
    throw new Error(`Invalid Location.`);
  }
}
module.exports = { isValidZip, isCityStateFormat, buildUrl };
