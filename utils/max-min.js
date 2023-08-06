export const MaxMin = {
  maxTemp(readings) {
    return Math.max(...readings.map((reading) => reading.temperature));
  },
  minTemp(readings) {
    return Math.min(...readings.map((reading) => reading.temperature));
  },
  maxWindSpeed(readings) {
    return Math.max(...readings.map((reading) => reading.windSpeed));
  },
  minWindSpeed(readings) {
    return Math.min(...readings.map((reading) => reading.windSpeed));
  },
  maxPressure(readings) {
    return Math.max(...readings.map((reading) => reading.pressure));
  },
  minPressure(readings) {
    return Math.min(...readings.map((reading) => reading.pressure));
  },
};
