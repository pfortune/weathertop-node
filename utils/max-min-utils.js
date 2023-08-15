/**
 * Utility functions to calculate the maximum and minimum values for temperature, wind speed, and pressure
 * from an array of weather readings.
 *
 * @param {Object[]} readings - An array of weather readings containing the values for temperature, wind speed, and pressure.
 * @returns {number} - The calculated maximum or minimum value for the specified attribute.
 */

export function maxTemp(readings) {
  return Math.max(...readings.map((reading) => reading.temperature));
}

export function minTemp(readings) {
  return Math.min(...readings.map((reading) => reading.temperature));
}

export function maxWindSpeed(readings) {
  return Math.max(...readings.map((reading) => reading.windSpeed));
}

export function minWindSpeed(readings) {
  return Math.min(...readings.map((reading) => reading.windSpeed));
}

export function maxPressure(readings) {
  return Math.max(...readings.map((reading) => reading.pressure));
}

export function minPressure(readings) {
  return Math.min(...readings.map((reading) => reading.pressure));
}
