import Handlebars from 'handlebars';

Handlebars.registerHelper('weatherIcon', function(weather) {
  return weather.toLowerCase().replace(' ', '-');
});
