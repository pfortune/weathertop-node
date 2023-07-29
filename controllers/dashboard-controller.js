import { stationStore } from "../models/station-store.js";

export const dashboardController = {
  async index(request, response) {
    // Check if the user is logged in
    if (!request.user) {
      response.redirect("/login");
      return;
    }

    // Fetch stations only belonging to the logged-in user
    const stations = await stationStore.getStationsByUserId(request.user._id);

    const viewData = {
      title: "Dashboard",
      stations,
      flash: request.flash,
    };

    console.log("-- dashboard rendered");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    // Check if the user is logged in
    if (!request.user) {
      response.redirect("/login");
      return;
    }

    const { title } = request.body;

    if (!title || title.trim() === "") {
      response.cookie("flash_error", "Station title cannot be empty!", { maxAge: 10000 });
      response.redirect("/dashboard");
      return;
    }

    // Include user ID in the new station
    const newStation = {
      title: title,
      userId: request.user._id, // Associate the station with the user
    };

    await stationStore.addStation(newStation);
    response.cookie("flash_success", "Station added successfully!", { maxAge: 10000 });
    response.redirect("/dashboard");
  },
};
