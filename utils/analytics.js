import * as MaxMin from "./max-min.js";
import * as Conversion from './conversion.js';
import { Trend } from "./trends.js";

export const Analytics = {
  updateWeather(station) {
    const { readings } = station;
    if (readings.length > 0) {
      const lastReading = readings[readings.length - 1];
      const { code, temperature, windSpeed, pressure, windDirection, timestamp } = lastReading;

      Object.assign(station, {
        code,
        windDirection,
        pressure,
        windSpeed,
        timestamp,
        weather: Conversion.weatherCodeToCondition(code),
        tempC: temperature,
        tempF: Conversion.celsiusToFahrenheit(temperature),
        maxTemp: MaxMin.maxTemp(readings),
        minTemp: MaxMin.minTemp(readings),
        beaufort: Conversion.kmhToBeaufort(windSpeed),
        maxWindSpeed: MaxMin.maxWindSpeed(readings),
        minWindSpeed: MaxMin.minWindSpeed(readings),
        maxPressure: MaxMin.maxPressure(readings),
        minPressure: MaxMin.minPressure(readings),
        windChill: Conversion.calculateWindChill(temperature, windSpeed),
        windDirectionCompass: Conversion.windDirectionToCompass(windDirection),
        pressureTrend: Trend.getTrend(readings, 'pressure'),
        tempTrend: Trend.getTrend(readings, 'temp'),
        windSpeedTrend: Trend.getTrend(readings, 'windSpeed'),
      });
    }
  },
};