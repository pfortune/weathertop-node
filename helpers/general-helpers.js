import Handlebars from 'handlebars';

Handlebars.registerHelper('eq', (a, b) => a.toLowerCase() === b.toLowerCase());
Handlebars.registerHelper('weatherIcon', weather => weather.toLowerCase().replace(' ', '-'));
Handlebars.registerHelper('add', (a, b) => a + b);
Handlebars.registerHelper('subtract', (a, b) => a - b);