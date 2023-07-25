import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js"; // import readingStore
import { Analytics } from "../utils/analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);

    const viewData = {
      title: station.title,
      station: station,
    }
    console.log(station);

    console.log("-- station rendered");
    response.render("station-view", viewData);
  }
};
