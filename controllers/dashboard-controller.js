import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js"; // import readingStore

export const dashboardController = {
  async index(request, response) {
    const stations = await stationStore.getAllStations();

    const viewData = {
      title: "Dashboard",
      stations: stations,
    };
    console.log("-- dashboard rendered");
    response.render("dashboard-view", viewData);
  }
};
