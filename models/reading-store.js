import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("readings");

export const readingStore = {
  async getAllReadings() {
    await db.read();
    return db.data.readings;
  },

  async addReading(stationId, reading) {
    await db.read();
    reading._id = v4();
    reading.stationid = stationId;
    db.data.readings.push(reading);
    await db.write();
    return reading;
  },

  async getReadingsByStationId(id) {
    await db.read();
    return db.data.readings.filter((reading) => reading.stationId === id);
  },

  async getReadingById(id) {
    await db.read();
    const reading = db.data.readings.find((reading) => reading._id === id);
    if (!reading) {
      throw new Error(`Reading with ID ${id} not found.`);
    }
    return reading;
  },

  async deleteReading(id) {
    await db.read();
    const index = db.data.readings.findIndex((reading) => reading._id === id);
    if (index !== -1) {
      db.data.readings.splice(index, 1);
      await db.write();
    } else {
      throw new Error('Reading not found');
    }
  },

  async deleteAllReadings() {
    db.data.readings = [];
    await db.write();
  },

  async updateReading(id, updatedReading) {
    await db.read();
    const reading = db.data.readings.find((reading) => reading._id === id);
    if (reading) {
      reading.code = updatedReading.code;
      reading.temperature = updatedReading.temperature;
      reading.windSpeed = updatedReading.windSpeed;
      reading.pressure = updatedReading.pressure;
      await db.write();
    } else {
      throw new Error('Reading not found');
    }
  },
  

};