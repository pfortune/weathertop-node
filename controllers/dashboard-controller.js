import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { generateReading } from "../utils/openweather.js";
import { Analytics } from "../utils/analytics-utils.js";

export const dashboardController = {
  async index(request, response) {
    // Fetch stations only belonging to the logged-in user
    const stations = await stationStore.getStationsByUserId(request.user._id);

    for (const station of stations) {
      station.readings = await readingStore.getReadingsByStationId(station._id);
      Analytics.updateWeather(station);
    }

    const viewData = {
      title: "Dashboard",
      stations
    };

    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const { title, latitude, longitude } = request.body;

    if (!title || title.trim() === "") {
      request.flash("error", "Station title cannot be empty!");
      response.redirect("/dashboard");
      return;
    } else if (latitude < -90 || latitude > 90) {
      request.flash("error", "Latitude must be between -90 and 90!");
      response.redirect("/dashboard");
      return;
    } else if (longitude < -180 || longitude > 180) {
      request.flash("error", "Longitude must be between -180 and 180!");
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

      try {
        const newReading = await generateReading({ latitude, longitude });

        if (newReading) {
          await readingStore.addReading(station._id, newReading);
          request.flash("success", "Station added and reading auto generated successfully!");
        } else {
          request.flash("error", "Failed to retrieve reading from API");
        }
      } catch (error) {
        // Handle specific error message or use a generic one
        const errorMessage = error.message || "An error occurred while retrieving reading from API";
        request.flash("error", errorMessage);
      }
      response.redirect("/dashboard");
    }
  },

  async deleteStation(request, response) {
    const id = request.params.id;
    await stationStore.deleteStationById(id);
    response.redirect("/dashboard");
  },
};
