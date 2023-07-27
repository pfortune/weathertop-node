import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js"; // import readingStore
import { Analytics } from "../utils/analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    Analytics.updateWeather(station);
    const viewData = station;

    console.log("-- station rendered");
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      code: parseInt(request.body.code),
      temperature: parseInt(request.body.temperature),
      windSpeed: parseInt(request.body.windSpeed),
      pressure: parseInt(request.body.pressure),
      windDirection: parseInt(request.body.windDirection)
    };
    await readingStore.addReading(station._id, newReading);
    await stationStore.getStationById(station._id);
    response.redirect(`/station/${station._id}`);
  }
};
