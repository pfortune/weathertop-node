import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { Analytics } from "../utils/analytics.js";

export const stationController = {
  async index(request, response) {

    let station;
    
    try {
      station = await stationStore.getStationById(request.params.id);
    } catch (error) {
      console.error(error.message); // You can log the error for debugging
      response.cookie("flash_error", "Station not found!", { maxAge: 10000 });
      response.redirect('/dashboard');
      return;
    }
    
    if (!request.user) {
      response.redirect("/login");
      return;
    }

    // Check if the station belongs to the logged-in user
    if (station.userid !== request.user._id) {
      response.cookie("flash_error", "You don't have access to this station!", { maxAge: 10000 });
      response.redirect("/dashboard");
      return;
    }

    Analytics.updateWeather(station);

    const viewData = {
      ...station,
      flash: request.flash,
    };

    console.log("-- station rendered");
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    if (!request.user) {
      response.redirect("/login");
      return;
    }

    const station = await stationStore.getStationById(request.params.id);

    const { code, temperature, windSpeed, pressure, windDirection } = request.body;
    const timestamp = stationController.formatDate(new Date());

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
      timestamp,
      windDirection: parseInt(windDirection),
    };

    await readingStore.addReading(station._id, newReading);
    response.cookie("flash_success", "Reading added successfully!", { maxAge: 10000 }); // Expires after 10 seconds
    response.redirect(`/station/${station._id}`);
  },

  async deleteReading(request, response) {
    if (!request.user) {
      response.redirect("/login");
      return;
    }

    const { id, readingid } = request.params;
    await readingStore.deleteReading(readingid);
    response.redirect(`/station/${id}`);
  },

  formatDate (date) {
    let dateTime = date.toLocaleString('en-GB', { 
     year: 'numeric', 
     month: '2-digit', 
     day: '2-digit', 
     hour: '2-digit', 
     minute: '2-digit', 
     second: '2-digit', 
     hour12: false 
    });

    let parts = dateTime.split(', ');
    let dateParts = parts[0].split('/');
    dateTime = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]} ${parts[1]}`;
    
    return dateTime;
  }
};
