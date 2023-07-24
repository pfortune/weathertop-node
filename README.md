# WeatherTop Release 1

## Introduction

WeatherTop Release 1 is the third version of the WeatherTop web companion application designed for WeatherTop 1000, a modular weather station. This version builds upon the features of the Baseline version, including the addition of wind direction data for each station, an expanded wind summary, and the ability to add new stations and readings.

## Features

- All features from the Baseline version
- Additional data in the reading for each station:
  - Wind Direction (number from 0 to 360)
- Expanded wind summary for each station:
  - Wind Compass
  - Wind Chill
- New Features:
  1. Add Station
  2. Add Reading

### Add Station

The default view of the application now presents a list of station names on the dashboard (without current conditions or readings). A station can be added via the "Add Station" button, which accepts the station name. Clicking on the Folder button opens the station view, summarizing the latest weather at the station.

### Add Reading

When a station is opened, the current conditions and readings appear. The application now allows users to add new readings to a station.

## Setup and Installation

1. Ensure that you have Node.js and Express installed on your system. If not, download and install [Node.js](https://nodejs.org/en/download/) which includes npm. You can install Express with `npm install express`.
2. Clone this repository to your local machine.
3. Navigate to the root directory of the project in your terminal.
4. Run `npm install` to install all dependencies.
5. Run `node app.js` or `npm start` (if you have a start script defined in your package.json) to start the application.
6. Access the application on your browser at `http://localhost:4000` (or whatever port you have specified).

## Usage

- Navigate to the Dashboard view to see the list of station names.
- Click on the Folder button to open a station view and see the latest weather at that station.
- Use the "Add Station" button to create a new station.
- Add new readings to a station when it is opened.
