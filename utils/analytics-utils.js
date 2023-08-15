import { maxTemp, minTemp, maxPressure, minPressure, maxWindSpeed, minWindSpeed } from "./max-min-utils.js";
import {
  weatherCodeToCondition,
  celsiusToFahrenheit,
  calculateWindChill,
  windDirectionToCompass,
  kmhToBeaufort,
} from "./conversion-utils.js";
import { trend } from "./trends-utils.js";

export const Analytics = {
    /**
   * Update weather station data with the latest reading, including
   * calculating various statistics and trends.
   * @param {Object} station - The weather station object containing readings
   */
  updateWeather(station) {
    const { readings } = station;
    if (readings.length > 0) {
      const lastReading = readings[readings.length - 1];
      const { code, temperature, windSpeed, pressure, windDirection, timestamp } = lastReading;

      // Assign new values and calculations to the station object
      Object.assign(station, {
        code,
        windDirection,
        pressure,
        windSpeed,
        timestamp,
        temperature,
        weather: weatherCodeToCondition(code),
        tempF: celsiusToFahrenheit(temperature),
        maxTemp: maxTemp(readings),
        minTemp: minTemp(readings),
        beaufort: kmhToBeaufort(windSpeed),
        maxWindSpeed: maxWindSpeed(readings),
        minWindSpeed: minWindSpeed(readings),
        maxPressure: maxPressure(readings),
        minPressure: minPressure(readings),
        windChill: calculateWindChill(temperature, windSpeed),
        windDirectionCompass: windDirectionToCompass(windDirection),
        pressureTrend: trend(readings, "pressure"),
        tempTrend: trend(readings, "temp"),
        windSpeedTrend: trend(readings, "windSpeed"),
      });
    }
  },
};
