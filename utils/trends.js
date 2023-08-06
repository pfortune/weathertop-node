export const Trend = {
  getTrend(readings, field) {
    if (readings.length < 3) {
      return "";
    }
  
    const lastThreeReadings = readings.slice(-3).map(reading => reading[field]);
    const [lastReading, secondLastReading, thirdLastReading] = lastThreeReadings;
  
    const isIncreasing = (lastReading - secondLastReading) > 0 && (secondLastReading - thirdLastReading) > 0;
    const isDecreasing = (lastReading - secondLastReading) < 0 && (secondLastReading - thirdLastReading) < 0;
  
    if (isIncreasing) {
      return "Increasing";
    }

    if (isDecreasing) {
      return "Decreasing";
    }

    return "Steady";
  }
}