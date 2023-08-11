export function maxTemp(readings) {
  return this.max(readings.map((reading) => reading.temperature));
}
export function minTemp(readings) {
  return this.min(readings.map((reading) => reading.temperature));
}
export function maxWindSpeed(readings) {
  return this.max(readings.map((reading) => reading.windSpeed));
}
export function minWindSpeed(readings) {
  return this.min(readings.map((reading) => reading.windSpeed));
}
export function maxPressure(readings) {
  return this.max(readings.map((reading) => reading.pressure));
}
export function minPressure(readings) {
  return this.min(readings.map((reading) => reading.pressure));
}
