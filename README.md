# WeatherTop Release 2

## Introduction

WeatherTop Release 2 is the fourth version of the WeatherTop web companion application designed for WeatherTop 1000, a modular weather station. This version builds upon the features of Release 1 and includes new features such as User Accounts, Station Locations, Current Weather Icons, and Max/Min weather readings.

## Features

- All features from Release 1
- New Features:
  1. User Accounts
  2. Location of Station
  3. Current Weather Icon
  4. Max/Min Readings

### User Accounts

Users must register and log in to use this version of the application. The login page is presented upon application launch, with unregistered users having the option to sign up.

### Location of Station

When adding a station, users are now required to input the latitude and longitude of the station in decimal degrees (DD) format.

### Current Weather Icon

Each weather code is associated with a corresponding icon, enhancing the visual representation of the current weather condition at a station.

### Max/Min Readings

The station report now includes maximum and minimum values for temperature, wind speed, and pressure.

## Setup and Installation

1. Ensure that you have Node.js installed on your system. If not, download and install [Node.js](https://nodejs.org/en/download/) which includes npm.
2. Clone this repository to your local machine.
3. Navigate to the root directory of the project in your terminal.
4. Run `npm install` to install all dependencies.
5. Run `npm run start` to start the application.
6. Access the application on your browser at `http://localhost:4000` (or whatever port you have specified).

## Usage

- Register or log in to the application upon launch.
- Navigate to the Dashboard view to see the list of station names.
- Click on the Folder button to open a station view and see the latest weather at that station.
- Use the "Add Station" button to create a new station, making sure to include the station's location.
- Add new readings to a station when it is opened.
- View the max/min readings for temperature, wind speed, and pressure in the station report.