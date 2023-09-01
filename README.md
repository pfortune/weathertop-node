# WeatherTop Release 4

Live Glitch App: [https://weathertopnode.glitch.me](https://weathertopnode.glitch.me)

## Test Account Details

Email: homer@simpson.com

Password: secret

## Introduction

WeatherTop Release 4 is the final and most advanced version of the WeatherTop web companion application designed for WeatherTop 1000, a modular weather station. Building upon the previous versions, this release adds powerful new features like Charts of Trends using Frappe Charts, OpenWeather API integration, and station location mapping with Leafletjs.

## Features

### From Previous Releases:
- All functionalities from Release 3 are included.

### New Features:

#### 1. **Chart of Trends for Temperature, Pressure, and Wind Speed**
- Using Frappe Charts, the Station page now provides visually engaging charts that display trends in Temperature, Pressure, and Wind Speed.

#### 2. **OpenWeather API Integration**
- Allows users to automatically fetch the latest readings for their weather stations using the OpenWeather API. This ensures more efficient real-time data tracking.

#### 3. **Map of Stations with Leafletjs**
- Stations are presented on a map on the user's dashboard using Leafletjs, enabling a visual representation that simplifies the understanding of station locations.

#### 4. **Flash Messages**
- Flash messages have been integrated to provide users with immediate feedback, such as success or error notifications after operations, enhancing the overall user experience.

#### 5. **Middleware Enhancements**
- Several middleware functions have been added, including 'Attach User', 'Auth Guard', 'Flash Messages', and 'Handle 404', which bolster the application's robustness and user-friendliness.

#### 6. **Weather Reports Data Store**
- A dedicated data store and model for weather reports have been created, emphasizing performance improvements by avoiding redundant calculations.

### Potential Enhancements (Future Scope):
- Looking ahead, there are plans to integrate improved validation mechanisms with Joi, and to bolster security via password encryption with Bcrypt, among other enhancements.

## Setup and Installation

1. Ensure that you have Node.js installed on your system. If not, download and install [Node.js](https://nodejs.org/en/download/) which includes npm.
2. Clone this repository to your local machine.
3. Navigate to the root directory of the project in your terminal.
4. Run `npm install` to install all dependencies.
5. Run `npm run start` to start the application.
6. Access the application on your browser at `http://localhost:4000` (or whatever port you have specified).

## Usage

- Register or log in to the application upon launch.
- Navigate to the Dashboard view to see the list of station names and map of stations.
- Click on the View Station button to open a station view and see the latest weather at that station, along with trends charts.
- Use the "Add Station" button to create a new station, making sure to include the station's location.
- Add new readings to a station when it is opened, or use OpenWeather API to auto generate the latest reading.
- View the max/min readings and trends for temperature, wind speed, and pressure in the station report.
- Delete readings and stations as needed.
- Edit your personal details via the account settings.
