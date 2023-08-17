import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { generateReading } from "../utils/openweather.js";
import { Analytics } from "../utils/analytics-utils.js";

export const dashboardController = {
  async index(request, response) {
    // Check if the user is logged in
    if (!request.user) {
      response.redirect("/login");
      return;
    }

    // Fetch stations only belonging to the logged-in user
    const stations = await stationStore.getStationsByUserId(request.user._id);

    for (const station of stations) {
      station.readings = await readingStore.getReadingsByStationId(station._id);
      Analytics.updateWeather(station);
    }

    const viewData = {
      title: "Dashboard",
      stations,
      flash: request.flash,
    };

    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    // Check if the user is logged in
    if (!request.user) {
      response.redirect("/login");
      return;
    }

    const { title, latitude, longitude } = request.body;

    if (!title || title.trim() === "") {
      response.cookie("flash_error", "Station title cannot be empty!", { maxAge: 10000 });
      response.redirect("/dashboard");
      return;
    } else if (latitude < -90 || latitude > 90) {
      response.cookie("flash_error", "Latitude must be between -90 and 90!", { maxAge: 10000 });
      response.redirect("/dashboard");
      return;
    } else if (longitude < -180 || longitude > 180) {
      response.cookie("flash_error", "Longitude must be between -180 and 180!", { maxAge: 10000 });
      response.redirect("/dashboard");
      return;
    } else {
      // Validation passed
      const newStation = {
        title,
        userid: request.user._id, // Associate the station with the user
        latitude,
        longitude,
      };

      const station = await stationStore.addStation(newStation);
      const apiKey = process.env.OPEN_WEATHER_API_KEY;

      try {
        const newReading = await generateReading({ latitude, longitude, apiKey });

        if (newReading) {
          await readingStore.addReading(station._id, newReading);
          response.cookie("flash_success", "Station added and reading auto generated successfully!", { maxAge: 10000 });
        } else {
          response.cookie("flash_error", "Failed to retrieve reading from API", { maxAge: 10000 });
        }
      } catch (error) {
        // Handle specific error message or use a generic one
        const errorMessage = error.message || "An error occurred while retrieving reading from API";
        response.cookie("flash_error", errorMessage, { maxAge: 10000 });
      }
        response.redirect("/dashboard");
      }
  },

  async deleteStation(request, response) {
    // Check if the user is logged in
    if (!request.user) {
      response.redirect("/login");
      return;
    }

    const id = request.params.id;
    await stationStore.deleteStationById(id);
    response.redirect("/dashboard");
  },
};
