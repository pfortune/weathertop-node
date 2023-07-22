import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js"; // import readingStore

export const dashboardController = {
  async index(request, response) {
    const stations = await stationStore.getAllStations();

    for (let station of stations) {
      station.readings = await readingStore.getReadingsByStationId(station._id);
    }

    const viewData = {
      title: "Dashboard",
      stations: stations,
    };
    
    console.log("-- dashboard rendered");
    response.render("dashboard-view", viewData);
  }
};
