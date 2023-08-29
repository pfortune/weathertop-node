import { initStore } from "../utils/store-utils.js";

const db = initStore("reports");

export const reportStore = {
  async addWeatherReport(stationId, report) {
    await db.read();

    // Check for existing report and delete if it exists
    const existingReportIndex = db.data.reports.findIndex(r => r.stationId === stationId);
    if (existingReportIndex !== -1) {
        db.data.reports.splice(existingReportIndex, 1);
    }

    // Add the new report
    report.stationId = stationId;
    db.data.reports.push(report);
    
    await db.write();
    return report;
},

  async getWeatherReportByStationId(id) {
    await db.read();
    return db.data.reports.find((report) => report.stationId === id);
  },
  
  async deleteWeatherReport(stationId) {
    await db.read();
    const reportIndex = db.data.reports.findIndex((report) => report.stationId === stationId);
  
    if (reportIndex !== -1) {
      db.data.reports.splice(reportIndex, 1);
      await db.write();
    }
  }
};