import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js"; // import readingStore
import { Analytics } from "../utils/analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    Analytics.updateWeather(station);

    const viewData = {
      ...station,
      flash: request.flash,
    };

    console.log("-- station rendered");
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const { code, temperature, windSpeed, pressure, windDirection } = request.body;

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
};
