const { processLocations, handleLocations } = require("../App/coreFunctions");
const axios = require("axios");

describe("Testing processLocations functionality", () => {
  test("Able to input single city", async () => {
    const location = ["Los Angeles, CA"];
    const result = await processLocations(location);

    expect(result).toStrictEqual({
      latitude: 34.0536909,
      longitude: -118.242766,
      name: "Los Angeles",
    });
  });

  test("Able to input single zip-code", async () => {
    const location = ["91316"];
    const result = await processLocations(location);

    expect(result).toStrictEqual({
      latitude: 34.1655,
      longitude: -118.5175,
      name: "Los Angeles",
    });
  });

  test("Able to input multiple arguments", async () => {
    const locations = ["Seattle, WA", 91316];
    let result = [];

    // Use Promise.all to await all asynchronous calls
    for (const location of locations) {
      result.push(processLocations(location));
    }

    result = await Promise.all(result);

    expect(result).toStrictEqual([
      {
        latitude: 47.6038321,
        longitude: -122.330062,
        name: "Seattle",
      },
      {
        latitude: 34.1655,
        longitude: -118.5175,
        name: "Los Angeles",
      },
    ]);
  });

  test("invalid city input", async () => {
    const locations = ["Seattle, MD"];

    // Await the promise rejection and check for the correct error message
    await expect(processLocations(locations)).rejects.toThrow(
      "Invalid Location"
    );
  });

  test("invalid zip-code input", async () => {
    const locations = ["1238"];

    // Await the promise rejection and check for the correct error message
    await expect(processLocations(locations)).rejects.toThrow(
      "Invalid Location"
    );
  });

  test("empty input", async () => {
    const locations = [];

    // Await the promise rejection and check for the correct error message
    await expect(processLocations(locations)).rejects.toThrow(
      "Invalid Location"
    );
  });

  test("can handle special characters", async () => {
    const location = ["San José, CA"];
    const result = await processLocations(location);

    await expect(result).toStrictEqual({
      latitude: 37.3361663,
      longitude: -121.890591,
      name: "San Jose",
    });
  });

  test("Input city but missing state", async () => {
    const locations = [];

    // Await the promise rejection and check for the correct error message
    await expect(processLocations(locations)).rejects.toThrow(
      "Invalid Location"
    );
  });

  test("Able to input a large amount of arguments", async () => {
    const locations = [
      "Seattle, WA",
      91316,
      "New York, NY",
      "San Francisco, CA",
      "Chicago, IL",
      "Houston, TX",
      "Phoenix, AZ",
      19103,
      "San Antonio, TX",
      "San Diego, CA",
      "Dallas, TX",
      "San Jose, CA",
      "Austin, TX",
      78701,
      "Jacksonville, FL",
      "Columbus, OH",
    ];

    let result = [];

    for (const location of locations) {
      result.push(processLocations(location));
    }

    result = await Promise.all(result);

    expect(result).toStrictEqual([
      {
        latitude: 47.6038321,
        longitude: -122.330062,
        name: "Seattle",
      },
      {
        latitude: 34.1655,
        longitude: -118.5175,
        name: "Los Angeles",
      },
      {
        latitude: 40.7127281,
        longitude: -74.0060152,
        name: "New York County",
      },
      {
        latitude: 37.7790262,
        longitude: -122.419906,
        name: "San Francisco",
      },
      {
        latitude: 41.8755616,
        longitude: -87.6244212,
        name: "Chicago",
      },
      {
        latitude: 29.7589382,
        longitude: -95.3676974,
        name: "Houston",
      },
      {
        latitude: 33.4484367,
        longitude: -112.074141,
        name: "Phoenix",
      },
      {
        latitude: 39.9513,
        longitude: -75.1741,
        name: "Philadelphia",
      },
      {
        latitude: 29.4246002,
        longitude: -98.4951405,
        name: "San Antonio",
      },
      {
        latitude: 32.7174202,
        longitude: -117.1627728,
        name: "San Diego",
      },
      {
        latitude: 32.7762719,
        longitude: -96.7968559,
        name: "Dallas",
      },
      {
        latitude: 37.3361663,
        longitude: -121.890591,
        name: "San Jose",
      },
      {
        latitude: 30.2711286,
        longitude: -97.7436995,
        name: "Austin",
      },
      {
        latitude: 30.2713,
        longitude: -97.7426,
        name: "Austin",
      },
      {
        latitude: 30.3321838,
        longitude: -81.655651,
        name: "Jacksonville",
      },
      {
        latitude: 39.9622601,
        longitude: -83.0007065,
        name: "Columbus",
      },
    ]);
  });
});
