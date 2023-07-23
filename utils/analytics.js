import { MaxMin } from "./max-min.js";
import { Conversion } from "./conversion.js";

export const Analytics = {
  updateWeather(station) {
    if (station.readings.length > 0) {
      const lastReading = station.readings[station.readings.length - 1];
      station.code = lastReading.code;
      station.weather = Conversion.weatherCodeToCondition(lastReading.code);
      station.tempC = lastReading.temperature;
      station.tempF = Conversion.celsiusToFahrenheit(lastReading.temperature);
      station.maxTemp = this.maxTemp(station.readings);
      station.minTemp = this.minTemp(station.readings);
      station.windSpeed = lastReading.windSpeed;
      station.beaufort = Conversion.kmhToBeaufort(lastReading.windSpeed);
      station.maxWindSpeed = this.maxWindSpeed(station.readings);
      station.minWindSpeed = this.minWindSpeed(station.readings);
      station.pressure = lastReading.pressure;
      station.maxPressure = this.maxPressure(station.readings);
      station.minPressure = this.minPressure(station.readings);

      const windChill = 13.12 + 0.6215 * lastReading.temperature - 11.37 * Math.pow(lastReading.windSpeed, 0.16) + 0.3965 * lastReading.temperature * Math.pow(lastReading.windSpeed, 0.16);
      station.windChill = parseFloat(windChill.toFixed(2));
    }
  },
  maxTemp(readings) {
    return MaxMin.max(readings.map(reading => reading.temperature));
  },
  minTemp(readings) {
    return MaxMin.min(readings.map(reading => reading.temperature));
  },
  maxWindSpeed(readings) {
    return MaxMin.max(readings.map(reading => reading.windSpeed));
  },
  minWindSpeed(readings) {
    return MaxMin.min(readings.map(reading => reading.windSpeed));
  },
  maxPressure(readings) {
    return MaxMin.max(readings.map(reading => reading.pressure));
  },
  minPressure(readings) {
    return MaxMin.min(readings.map(reading => reading.pressure));
  },

};