import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js"; // import readingStore
import { Analytics } from "../utils/analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    Analytics.updateWeather(station);

    const flash = {
      success: request.cookies.flash_success,
      error: request.cookies.flash_error,
    };
  
    response.clearCookie('flash_success'); // Clear the success cookie after reading
    response.clearCookie('flash_error'); // Clear the error cookie after reading

    const viewData = {
      ...station,
      flash: flash,
    };

    console.log("-- station rendered");
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
  
    // Validate that none of the fields are empty
    const newReading = {
      code: parseInt(request.body.code),
      temperature: parseInt(request.body.temperature),
      windSpeed: parseInt(request.body.windSpeed),
      pressure: parseInt(request.body.pressure),
      windDirection: parseInt(request.body.windDirection)
    };
  
    // Check if any of the fields are NaN (i.e., were empty in the form)
    const missingFields = Object.keys(newReading).filter(key => isNaN(newReading[key]));
  
    if (missingFields.length > 0) {
      console.log(missingFields);
      // Create an error message listing the missing fields
      const missingFieldsList = missingFields.join(', ');
      response.cookie('flash_error', `The following fields need to be filled: ${missingFieldsList}`, { maxAge: 10000 }); // Expires after 10 seconds
  
      response.redirect(`/station/${station._id}`);
    } else {
      await readingStore.addReading(station._id, newReading);
      await stationStore.getStationById(station._id);
  
      response.cookie('flash_success', 'Reading added successfully!', { maxAge: 10000 }); // Expires after 10 seconds
  
      response.redirect(`/station/${station._id}`);
    }
  }
  
};
