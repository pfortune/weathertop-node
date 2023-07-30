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

    const { title, latitude, longitude } = request.body;

    if (!title || title.trim() === "") {
      response.cookie("flash_error", "Station title cannot be empty!", { maxAge: 10000 });
      response.redirect("/dashboard");
      return;
    } else if (latitude < -90 || latitude > 90) {
      response.cookie("flash_error", "Latitude must be between -90 and 90!", { maxAge: 10000 });
      response.redirect("/dashboard");
      return;
    } else if (longitude < -180 || longitude > 180) {
      response.cookie("flash_error", "Longitude must be between -180 and 180!", { maxAge: 10000 });
      response.redirect("/dashboard");
      return;
    } else {
      // Validation passed
      const newStation = {
        title,
        userid: request.user._id, // Associate the station with the user
        latitude,
        longitude
      };

      await stationStore.addStation(newStation);
      response.cookie("flash_success", "Station added successfully!", { maxAge: 10000 });
      response.redirect("/dashboard");
    }
  },
};
