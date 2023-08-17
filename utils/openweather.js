import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

export async function generateReading({ latitude, longitude, exclude }) {
  const requestUrl = buildUrl({ latitude, longitude, exclude });

  try {
    const response = await axios.get(requestUrl);

    if (response.status === 200) {
      const currentWeather = response.data.current;
      const newReading = {
        code: Math.round(currentWeather.weather[0].id / 100) * 100,
        temperature: parseInt(currentWeather.temp),
        windSpeed: parseInt(currentWeather.wind_speed),
        windDirection: parseInt(currentWeather.wind_deg),
        pressure: parseInt(currentWeather.pressure),
      };
      return newReading;
    }
  } catch (error) {
    handleApiError(error);
  }

  return null;
}

export async function getDailyWeatherTrends({ latitude, longitude, exclude }) {
  const defaultExclude = "minutely,hourly,alerts"; 
  const requestUrl = buildUrl({ latitude, longitude, exclude: exclude || defaultExclude });

  let report = { labels: [], temperature: [], windSpeed: [], pressure: [] };
  try {
    const response = await axios.get(requestUrl);

    if (response.status === 200) {
      const trendsData = response.data.daily;
      for (let i = 0; i < trendsData.length; i++) {
        const date = new Date(trendsData[i].dt * 1000);
        report.labels.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
        report.temperature.push(trendsData[i].temp.day);
        report.windSpeed.push(trendsData[i].wind_speed);
        report.pressure.push(trendsData[i].pressure);
      }
    }
  } catch (error) {
    handleApiError(error);
  }

  return report;
}

function buildUrl(options = {}) {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const {
    latitude,
    longitude,
    exclude = "minutely,hourly,daily,alerts"
  } = options;

  return `${BASE_URL}?lat=${latitude}&lon=${longitude}&units=metric&exclude=${exclude}&appid=${apiKey}`;
}

function handleApiError(error) {
  if (error.response && error.response.status === 401) {
    throw new Error("Unauthorized access to weather API");
  } else {
    throw error;
  }
}