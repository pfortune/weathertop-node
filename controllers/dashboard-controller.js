import { stationStore } from "../models/station-store.js";

export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "Dashboard",
      stations: await stationStore.getAllStations(),
    };
    console.log("-- dashboard rendered");
    response.render("dashboard-view", viewData);
  }
};