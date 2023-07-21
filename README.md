# WeatherTop Starter

## Introduction

WeatherTop Starter is the first version of the WeatherTop web companion application designed for WeatherTop 1000, a modular weather station. This application allows users to view meteorological readings for a small number of weather stations. The application includes a dashboard to display readings and informational graphic images on the About and Main views.

## Features

- Launches and reads a JSON file of readings for a small number of weather stations
- Dashboard to display weather readings
- About and Main views with informational and attractive graphic images

### Weather Readings

Each reading in the JSON file consists of:

- Weather code (number in range 100-800) - integer
- Temperature (Celsius) - decimal
- Wind speed (km/h) - decimal

## Setup and Installation

1. Ensure that you have Node installed on your system.
2. Clone this repository to your local machine.
3. Navigate to the root directory of the project in your terminal.
4. Run `npm install` and then `npm run start` to start this application.
5. Access the application on your browser at `http://localhost:4000`.

## Usage

- Navigate to the Dashboard view to see the weather readings from the JSON file.
- Visit the About page to learn more about WeatherTop Inc., the WeatherTop 1000 device, and the purpose of the web companion application.
- The Main view contains interesting information about the application and the weather domain in general.