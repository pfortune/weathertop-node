import { formatDate } from "./date-utils.js";
import axios from "axios";

const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

export async function generateReading({ latitude, longitude }) {
  const requestUrl = buildUrl({ latitude, longitude });

  try {
    const response = await axios.get(requestUrl);

    if (response.status === 200) {
      const currentWeather = response.data.current;
      const newReading = {
        code: parseInt(currentWeather.weather[0].id),
        temperature: parseInt(currentWeather.temp),
        windSpeed: parseInt(currentWeather.wind_speed),
        windDirection: parseInt(currentWeather.wind_deg),
        pressure: parseInt(currentWeather.pressure),
      };
      return newReading;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error specifically
      throw new Error("Unauthorized access to weather API");
    } else {
      // Handle other errors
      throw error;
    }
  }

  return null;
}

function buildUrl(options = {}) {
  const {
    latitude,
    longitude,
    exclude = "minutely,hourly,daily,alerts",
  } = options;

  return `${BASE_URL}?lat=${latitude}&lon=${longitude}&units=metric&exclude=${exclude}&appid=${API_KEY}`;
}
