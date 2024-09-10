# Geolocation CLI Utility

This is a command-line utility for fetching geolocation data based on city/state or zip code inputs. It uses the OpenWeatherMap Geocoding API to retrieve latitude, longitude, and place names.

## Prerequisites

- Node.js (version 14 or later)
- An OpenWeatherMap API key

## Installation

1. Clone the repository:

   ```sh
   git clone git@github.com:Macr0ph4g3/GeoLocUtil.git
   cd <repository-directory>
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Set up your API key:

   Create a file named `config.js` in the root of the repository with the following content:

   ```js
   const dotenv = require("dotenv");

   dotenv.config();
   module.exports = {
     apiKey: process.env.API_KEY,
   };
   ```

   Then create a .env file in the root of the repository with your api key from OpenWeatherMap

   ```js
   API_KEY = "<your-openweathermap-key>";
   ```

## Usage

You can use the CLI utility by providing one or more locations as arguments. The locations can be in the format of city/state or zip code. Make sure to seperate the locations with a space.

### Example Commands

```sh
npm run weather "San Francisco, CA" "91316"
```

```sh
npm run weather "21701"
```

```sh
node cli.js --locations "San José, CA" "94105" "90001"
```

## Testing

Testing for this utility is done using Jest. You can run them by using the command below.

```sh
npm test
```

## Files Overview

- `cli.js`: The main entry point of the CLI. It uses `yargs` for parsing command-line arguments and handles the invocation of core functions.
- `coreFunctions.js`: Contains functions to fetch and process location data, and print results to the console.
- `utils.js`: Utility functions to validate location formats and build the appropriate API URL. These could be used in other files if this were to be expanded upon.
