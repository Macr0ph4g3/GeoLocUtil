const { processLocations, handleLocations } = require("../App/coreFunctions");
const axios = require("axios");

describe("Testing processLocations functionality", () => {
  test("Able to input single city", async () => {
    const location = ["Los Angeles, WA"];
    const result = await processLocations(location);

    expect(result).toStrictEqual({
      latitude: 34.0536909,
      longitude: -118.242766,
      name: "Seattle",
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
});
