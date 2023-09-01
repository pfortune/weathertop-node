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
      console.error(error.message);
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

    // Fetch the readings of the station
    station.readings = await readingStore.getReadingsByStationId(station._id);

    if (!station.readings || station.readings.length === 0) {
      const viewData = {
        ...station,
      };

      response.render("station-view", viewData);
      return;
    }

    try {
      weatherTrends = await getDailyWeatherTrends({ latitude: station.latitude, longitude: station.longitude });
    } catch (error) {
      const errorMessage = error.message || "An error occurred while retrieving daily weather trends from API";
      request.flash("error", errorMessage);
    }

    // Now, we can safely check for or generate a latestReport
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
      request.flash("error", "All fields must be filled!");
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

      // Update the station object with the new reading
      station.readings.push(newReading);

      // Update the report after adding the new reading
      const updatedReport = Analytics.updateWeather(station);
      await reportStore.addWeatherReport(station._id, updatedReport);

      request.flash("success", "Reading added successfully!");
    } catch (error) {
      request.flash("error", "Failed to add reading!");
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
        station.readings.push(newReading);

        // Update the report after adding the new reading
        const report = Analytics.updateWeather(station);
        await reportStore.addWeatherReport(station._id, report);

        request.flash("success", "Reading auto generated successfully!");
      } else {
        request.flash("error", "Failed to retrieve reading from API");
      }
    } catch (error) {
      // Handle specific error message or use a generic one
      const errorMessage = error.message || "An error occurred while retrieving reading from API";
      request.flash("error", errorMessage);
    }

    response.redirect(`/station/${_id}`);
  },

  async deleteReading(request, response) {
    const { id: stationId, readingid } = request.params;

    await readingStore.deleteReading(readingid);
    const station = await stationStore.getStationById(stationId);
    const updatedReport = Analytics.updateWeather(station);

    if (updatedReport) {
      await reportStore.addWeatherReport(stationId, updatedReport);
    } else {
      await reportStore.deleteWeatherReport(stationId);
    }

    response.redirect(`/station/${stationId}`);
  },
};
