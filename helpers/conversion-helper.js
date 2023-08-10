import Handlebars from 'handlebars';
import { Conversion } from '../utils/conversion.js';

Handlebars.registerHelper('celsiusToFahrenheit', Conversion.celsiusToFahrenheit);
Handlebars.registerHelper('kmhToBeaufort', Conversion.kmhToBeaufort);
Handlebars.registerHelper('windDirectionToCompass', Conversion.windDirectionToCompass);
Handlebars.registerHelper('calculateWindChill', Conversion.calculateWindChill);
Handlebars.registerHelper('weatherCodeToCondition', Conversion.weatherCodeToCondition);
