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
  updateWeather(station) {
    const readings = [...station.readings]; // Ensure we're working with a copy
    if (readings.length > 0) {
      const lastReading = readings[readings.length - 1];
      const { code, temperature, windSpeed, pressure, windDirection, timestamp } = lastReading;

      // Create a new analytics object
      const analytics = {
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
        tempTrend: trend(readings, "temperature"),
        windSpeedTrend: trend(readings, "windSpeed"),
      };

      return analytics;
    }
    return null;
  },
};
