import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { readingStore } from "./reading-store.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations.sort((a, b) => (a.name > b.name ? 1 : -1));
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationsByUserId(userId) {
    await db.read();
    return db.data.stations.filter((station) => station.userId === userId);
  },

  async getStationById(id) {
    await db.read();
    const station = db.data.stations.find((station) => station._id === id);
    if (!station) {
      throw new Error(`Station with ID ${id} not found.`);
    }
    station.readings = await readingStore.getReadingsByStationId(station._id);
    return station;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    if (index === -1) {
      throw new Error(`Station with ID ${id} not found.`);
    }
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },
};
