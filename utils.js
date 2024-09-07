function isValidZip(location) {
  return /^\d{5}$/.test(location.toString());
}

function isCityStateFormat(location) {
  const regex = /^[a-zA-Z\s]+,\s*[a-zA-Z\s]+$/;
  return regex.test(location);
}

function buildUrl(location, apiKey) {
  let stringifiedLocation = location.toString();

  if (isValidZip(stringifiedLocation)) {
    return `http://api.openweathermap.org/geo/1.0/zip?zip=${stringifiedLocation},US&appid=${apiKey}`;
  } else if (isCityStateFormat(stringifiedLocation)) {
    const [city, state] = stringifiedLocation.replace(/\s+/g, "").split(",");
    return `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=1&appid=${apiKey}`;
  } else {
    throw new Error(`${location} is an invalid location.`);
  }
}

module.exports = { isValidZip, isCityStateFormat, buildUrl };
