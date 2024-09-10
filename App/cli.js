const yargs = require("yargs").option("locations", {
  type: "array",
  desc: "One or more locations",
});
const { processLocations } = require("./coreFunctions");

const locations = yargs.argv.locations || [];

async function handleLocations(locations) {
  if (locations.length === 0) {
    console.error(
      "Bad Locations, please ensure you're providing a valid locations argument"
    );
  } else {
    for (const location of locations) {
      await processLocations(location);
    }
  }
}

handleLocations(locations);
