import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { readingStore } from "./reading-store.js"

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations.sort((a, b) => (a.name > b.name ? 1 : -1));
  },

  async getStationById(id) {
    await db.read();
    const station = db.data.stations.find((station) => station._id === id);
    station.readings = await readingStore.getReadingsByStationId(station._id);
    return station;
  },
};