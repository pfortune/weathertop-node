import * as Handlebars from 'handlebars';
import {
  celsiusToFahrenheit,
  kmhToBeaufort,
  windDirectionToCompass,
  calculateWindChill,
  weatherCodeToCondition
} from '../utils/conversion.js';
Handlebars.registerHelper('celsiusToFahrenheit', celsiusToFahrenheit);
Handlebars.registerHelper('kmhToBeaufort', kmhToBeaufort);
Handlebars.registerHelper('windDirectionToCompass', windDirectionToCompass);
Handlebars.registerHelper('calculateWindChill', calculateWindChill);
Handlebars.registerHelper('weatherCodeToCondition', weatherCodeToCondition);
