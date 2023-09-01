/**
 * Determines the trend of a given field in the last three readings. If the field is consistently increasing
 * or decreasing across the last three readings, the function will return "Increasing" or "Decreasing", respectively.
 * If the field is neither consistently increasing nor decreasing, the function returns "Steady".
 * If there are fewer than three readings, the function returns an empty string.
 *
 * @param {Object[]} readings - An array of weather readings.
 * @param {string} field - The field in the readings for which to determine the trend.
 * @returns {string} - The trend of the field: "Increasing", "Decreasing", "Steady", or "" (empty string).
 */
export function trend(readings, field) {
  if (readings.length < 3) {
    return "";
  }

  console.log(readings);

  const lastThreeReadings = readings.slice(-3).map((reading) => reading[field]);

  const [lastReading, secondLastReading, thirdLastReading] = lastThreeReadings;

  const isIncreasing = lastReading - secondLastReading > 0 && secondLastReading - thirdLastReading > 0;
  const isDecreasing = lastReading - secondLastReading < 0 && secondLastReading - thirdLastReading < 0;

  if (isIncreasing) {
    return "Increasing";
  }

  if (isDecreasing) {
    return "Decreasing";
  }

  return "Steady";
}
