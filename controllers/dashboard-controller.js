import { stationStore } from "../models/station-store.js";

export const dashboardController = {
  async index(request, response) {
    const stations = await stationStore.getAllStations();

    const viewData = {
      title: "Dashboard",
      stations: stations,
    };

    console.log("-- dashboard rendered");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const newStation = {
      title: request.body.title
    };
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};
