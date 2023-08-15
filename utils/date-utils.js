/**
 * Utility functions to calculate the maximum and minimum values for temperature, wind speed, and pressure
 * from an array of weather readings.
 *
 * @param {Object[]} readings - An array of weather readings containing the values for temperature, wind speed, and pressure.
 * @returns {number} - The calculated maximum or minimum value for the specified attribute.
 */
export function formatDate (date) {
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