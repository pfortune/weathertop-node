export const Conversion = {
  /**
   * Converts a temperature from Celsius to Fahrenheit.
   *
   * @param celsius Temperature in Celsius
   * @return Temperature in Fahrenheit
   */
  celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  },

  /**
   * Converts a wind speed from kilometers per hour (km/h) to Beaufort scale.
   *
   * @param kmh Wind speed in kilometers per hour
   * @return Wind speed on the Beaufort scale
   */
  kmhToBeaufort(kmh) {
    let limits = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];

    for (let i = 0; i < limits.length; i++) {
      if (kmh < limits[i]) {
        return i;
      }
    }

    return 12;
  },

  /**
   * Converts a wind direction in degrees to the corresponding compass direction.
   *
   * @param windDirection Wind direction in degrees
   * @return The corresponding compass direction
   */
  windDirectionToCompass(windDirection) {
    const compassDirections = [
      "North",
      "North Northeast",
      "Northeast",
      "East Northeast",
      "East",
      "East Southeast",
      "Southeast",
      "South Southeast",
      "South",
      "South Southwest",
      "Southwest",
      "West Southwest",
      "West",
      "West Northwest",
      "Northwest",
      "North Northwest",
      "North",
    ];

    const degreeRange = 360.0 / (compassDirections.length - 1);
    const index = Math.round((windDirection % 360) / degreeRange);
    return compassDirections[index];
  },

  /**
   * Calculates wind chill using the temperature and wind speed.
   *
   * @param temperature The temperature in degrees Celsius
   * @param windSpeed The wind speed in km/h
   * @return The wind chill in degrees Celsius
   */

  calculateWindChill(temperature, windSpeed) {
    return this.roundToTwoDecimalPlaces(
      13.12 +
        0.6215 * temperature -
        11.37 * Math.pow(windSpeed, 0.16) +
        0.3965 * temperature * Math.pow(windSpeed, 0.16)
    );
  },

  /**
   * Rounds a decimal value to two decimal places.
   *
   * @param value The decimal value to be rounded
   * @return The rounded decimal value
   */
  roundToTwoDecimalPlaces(value) {
    return parseFloat(value.toFixed(2));
  },

  /**
   * Returns the description corresponding to a Beaufort scale value.
   *
   * @param beaufortValue Beaufort scale value (0-12)
   * @return Description of the Beaufort scale value
   */
  beaufortDescription(beaufortValue) {
    let descriptions = [
      "Calm",
      "Light air",
      "Light breeze",
      "Gentle breeze",
      "Moderate breeze",
      "Fresh breeze",
      "Strong breeze",
      "Near gale",
      "Gale",
      "Strong gale",
      "Storm",
      "Violent storm",
      "Hurricane",
    ];

    if (beaufortValue >= 0 && beaufortValue < descriptions.length) {
      return descriptions[beaufortValue];
    }

    return "Invalid Beaufort value";
  },

  /**
   * Returns the description corresponding to a Weather code.
   *
   * @param weatherCode Weather code value (100 - 800)
   * @return Description of the Weather code value
   */
  weatherCodeToCondition(code) {
    switch (code) {
      case 100:
        return "Clear";
      case 200:
        return "Partial clouds";
      case 300:
        return "Cloudy";
      case 400:
        return "Light Showers";
      case 500:
        return "Heavy Showers";
      case 600:
        return "Rain";
      case 700:
        return "Snow";
      case 800:
        return "Thunder";
      default:
        return "Unknown weather condition";
    }
  },
};
