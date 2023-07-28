import { stationStore } from "../models/station-store.js";

export const dashboardController = {
  async index(request, response) {
    const stations = await stationStore.getAllStations();

    const viewData = {
      title: "Dashboard",
      stations,
      flash: request.flash,
    };

    console.log("-- dashboard rendered");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const { title }  = request.body;

    if (!title || title.trim() === '') {
      // If the title is empty or just whitespace, set an error message
      response.cookie('flash_error', 'Station title cannot be empty!', { maxAge: 10000 }); // Expires after 10 seconds
      response.redirect("/dashboard");
    } else {
      const newStation = {
        title: title
      };

      await stationStore.addStation(newStation);
      response.cookie('flash_success', 'Station added successfully!', { maxAge: 10000 }); // Expires after 10 seconds
      response.redirect("/dashboard");
    }
  }
};
