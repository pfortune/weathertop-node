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
