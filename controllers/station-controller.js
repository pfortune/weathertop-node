import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { reportStore } from "../models/report-store.js";
import { generateReading, getDailyWeatherTrends } from "../utils/openweather.js";
import { Analytics } from "../utils/analytics-utils.js";

export const stationController = {
  async index(request, response) {
    let station, latestReport, weatherTrends;
    try {
      station = await stationStore.getStationById(request.params.id);
    } catch (error) {
      console.error(error.message); // You can log the error for debugging
      request.flash("error", "Station not found!");
      response.redirect("/dashboard");
      return;
    }

    // Check if the station belongs to the logged-in user
    if (station.userid !== request.user._id) {
      request.flash("error", "You don't have access to this station!");
      response.redirect("/dashboard");
      return;
    }

    try {
      weatherTrends = await getDailyWeatherTrends({ latitude: station.latitude, longitude: station.longitude });
    } catch (error) {
      // Handle specific error message or use a generic one
      const errorMessage = error.message || "An error occurred while retrieving daily weather trends from API";
      request.flash("error", errorMessage); // Expires after 10 seconds
    }

    // Check if a weather report exists for the station
    latestReport = await reportStore.getWeatherReportByStationId(station._id);

    if (!latestReport) {
      latestReport = await reportStore.addWeatherReport(station._id, Analytics.updateWeather(station));
    }

    const viewData = {
      ...station,
      ...latestReport,
      weatherTrends,
    };

    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    let station;
    try {
      station = await stationStore.getStationById(request.params.id);
    } catch (error) {
      console.error(error.message); // You can log the error for debugging
      request.flash("error", "Station not found!");
      response.redirect("/dashboard");
      return;
    }

    const { code, temperature, windSpeed, pressure, windDirection } = request.body;

    // Validation
    if (!code || !temperature || !windSpeed || !pressure || !windDirection) {
      request.flash("error", "All fields must be filled!"); // Expires after 10 seconds
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

    try {
      await readingStore.addReading(station._id, newReading);

      // Update the report after adding the new reading
      const updatedReport = Analytics.updateWeather(station);
      await reportStore.addWeatherReport(station._id, updatedReport);
      
      request.flash("success", "Reading added successfully!"); // Expires after 10 seconds
    } catch (error) {
      request.flash("error", "Failed to add reading!"); // Expires after 10 seconds
    }

    response.redirect(`/station/${station._id}`);
  },

  async addReadingFromAPI(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const { latitude, longitude, _id } = station;

    try {
      const newReading = await generateReading({ latitude, longitude });

      if (newReading) {
        await readingStore.addReading(_id, newReading);

            // Update the station object with the new reading
            station.readings = [newReading]; 

            // Update the report after adding the new reading
            const report = Analytics.updateWeather(station);
            await reportStore.addWeatherReport(station._id, report);

        request.flash("success", "Reading auto generated successfully!"); // Expires after 10 seconds
      } else {
        request.flash("error", "Failed to retrieve reading from API"); // Expires after 10 seconds
      }
    } catch (error) {
      // Handle specific error message or use a generic one
      const errorMessage = error.message || "An error occurred while retrieving reading from API";
      request.flash("error", errorMessage); // Expires after 10 seconds
    }

    response.redirect(`/station/${_id}`);
  },

  async deleteReading(request, response) {
    const { id: stationId, readingid } = request.params;

    // Remove the reading from the station's readings list
    await readingStore.deleteReading(readingid);

    // Get updated station details
    const station = await stationStore.getStationById(stationId);

    // Update the report for that station
    const updatedReport = Analytics.updateWeather(station);
    await reportStore.addWeatherReport(stationId, updatedReport);

    response.redirect(`/station/${stationId}`);
  },
};
