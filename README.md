# WeatherTop Baseline

## Introduction

WeatherTop Baseline is the second version of the WeatherTop web companion application designed for WeatherTop 1000, a modular weather station. This application includes all the features from v1-Starter and adds an additional piece of data, Pressure, in the readings for each weather station. The dashboard now presents the latest weather at each station, providing more comprehensive insights into current weather conditions.

## Features

- All features from v1-Starter
- Additional pressure data (hPa) in readings for each station
- Dashboard now displays the latest weather for each station, including:
  - Station Name
  - Weather conditions (code presented as a description)
  - Temperature in both Celsius and Fahrenheit
  - Wind speed in Beaufort scale
  - Pressure

### Weather Readings

Each reading in the JSON file consists of:

- Weather code (number in range 100-800) - integer
- Temperature (Celsius) - decimal
- Wind speed (km/h) - decimal
- Pressure (hPa) - number

## Setup and Installation

1. Ensure that you have Node.js and Express installed on your system. If not, download and install [Node.js](https://nodejs.org/en/download/) which includes npm. You can install Express with `npm install express`.
2. Clone this repository to your local machine.
3. Navigate to the root directory of the project in your terminal.
4. Run `npm install` to install all dependencies.
5. Run `node app.js` or `npm start` (if you have a start script defined in your package.json) to start the application.
6. Access the application on your browser at `http://localhost:4000` (or whatever port you have specified).

## Usage

- Navigate to the Dashboard view to see the latest weather for each station, including weather conditions, temperature, wind speed, and pressure.
- Visit the About page to learn more about WeatherTop Inc., the WeatherTop 1000 device, and the purpose of the web companion application.
- The Main view contains interesting information about the application and the weather domain in general.
