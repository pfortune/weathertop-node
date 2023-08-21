import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { generateReading, getDailyWeatherTrends } from "../utils/openweather.js";
import { Analytics } from "../utils/analytics-utils.js";

export const stationController = {
  async index(request, response) { 
    let station, weatherTrends;

    try {
      station = await stationStore.getStationById(request.params.id);
    } catch (error) {
      console.error(error.message); // You can log the error for debugging
      response.cookie("flash_error", "Station not found!", { maxAge: 10000 });
      response.redirect("/dashboard");
      return;
    }

    try {
      weatherTrends = await getDailyWeatherTrends({latitude: station.latitude, longitude: station.longitude});
    } catch (error) {
      // Handle specific error message or use a generic one
      const errorMessage = error.message || "An error occurred while retrieving daily weather trends from API";
      response.cookie("flash_error", errorMessage, { maxAge: 10000 }); // Expires after 10 seconds
    }

    // Check if the station belongs to the logged-in user
    if (station.userid !== request.user._id) {
      response.cookie("flash_error", "You don't have access to this station!", { maxAge: 10000 });
      response.redirect("/dashboard");
      return;
    }

    Analytics.updateWeather(station);

    const viewData = {
      ...station,
      weatherTrends,
      flash: request.flash,
    };

    console.log(viewData);

    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);

    const { code, temperature, windSpeed, pressure, windDirection } = request.body;
    const timestamp = formatDate(new Date());

    // Validation
    if (!code || !temperature || !windSpeed || !pressure || !windDirection) {
      response.cookie("flash_error", "All fields must be filled!", { maxAge: 10000 }); // Expires after 10 seconds
      response.redirect(`/station/${station._id}`);
      return;
    }

    const newReading = {
      code: parseInt(code),
      temperature: parseInt(temperature),
      windSpeed: parseInt(windSpeed),
      pressure: parseInt(pressure),
      windDirection: parseInt(windDirection),
    };

    await readingStore.addReading(station._id, newReading);
    response.cookie("flash_success", "Reading added successfully!", { maxAge: 10000 }); // Expires after 10 seconds
    response.redirect(`/station/${station._id}`);
  },

  async addReadingFromAPI(request, response) {
    const { latitude, longitude, _id } = await stationStore.getStationById(request.params.id);

    try {
      const newReading = await generateReading({ latitude, longitude });
  
      if (newReading) {
        await readingStore.addReading(_id, newReading);
        response.cookie("flash_success", "Reading auto generated successfully!", { maxAge: 10000 }); // Expires after 10 seconds
      } else {
        response.cookie("flash_error", "Failed to retrieve reading from API", { maxAge: 10000 }); // Expires after 10 seconds
      }
    } catch (error) {
      // Handle specific error message or use a generic one
      const errorMessage = error.message || "An error occurred while retrieving reading from API";
      response.cookie("flash_error", errorMessage, { maxAge: 10000 }); // Expires after 10 seconds
    }
  
    response.redirect(`/station/${_id}`);
  },  

  async deleteReading(request, response) {
    const { id, readingid } = request.params;
    await readingStore.deleteReading(readingid);
    response.redirect(`/station/${id}`);
  },
};
