import { MaxMin } from "./max-min.js";
import { Conversion } from "./conversion.js";
import { Trend } from "./trends.js";

export const Analytics = {
  updateWeather(station) {
    if (station.readings.length > 0) {
      const lastReading = station.readings[station.readings.length - 1];
      station.code = lastReading.code;
      station.timestamp = lastReading.timestamp;
      station.weather = Conversion.weatherCodeToCondition(lastReading.code);
      station.tempC = lastReading.temperature;
      station.tempF = Conversion.celsiusToFahrenheit(lastReading.temperature);
      station.maxTemp = MaxMin.maxTemp(station.readings);
      station.minTemp = MaxMin.minTemp(station.readings);
      station.windSpeed = lastReading.windSpeed;
      station.beaufort = Conversion.kmhToBeaufort(lastReading.windSpeed);
      station.maxWindSpeed = MaxMin.maxWindSpeed(station.readings);
      station.minWindSpeed = MaxMin.minWindSpeed(station.readings);
      station.pressure = lastReading.pressure;
      station.maxPressure = MaxMin.maxPressure(station.readings);
      station.minPressure = MaxMin.minPressure(station.readings);
      station.windChill = Conversion.calculateWindChill(lastReading.temperature, lastReading.windSpeed);
      station.windDirection = lastReading.windDirection;
      station.windDirectionCompass = Conversion.windDirectionToCompass(lastReading.windDirection);
      station.pressureTrend = Trend.getTrend(station.readings, 'pressure');
      station.tempTrend = Trend.getTrend(station.readings, 'temp');
      station.windSpeedTrend = Trend.getTrend(station.readings, 'windSpeed');
    }
  }
};
