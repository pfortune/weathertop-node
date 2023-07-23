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
