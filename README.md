# WeatherTop Release 3

Live Glitch App: [https://weathertopnode.glitch.me](https://weathertopnode.glitch.me)

## Test Account Details

Email: homer@simpson.com

Password: secret

## Introduction

WeatherTop Release 3 is the fifth and penultimate version of the WeatherTop web companion application designed for 
WeatherTop 1000, a modular weather station. This version includes all features from the previous release, and adds 6 
new features such as Trends, Date/Time stamp, All Stations Summary, Delete Support, Cloud Deployment, and Member Detail 
Editing.

## Features

- All features from Release 2
- New Features:
    1. Trends
    2. Date/Time Stamp on Each Reading
    3. All Stations Summary
    4. Station/Reading Delete Support
    5. Deployed to the Cloud
    6. Members Can Edit Their Personal Details

### Trends

Trends are available for Temperature, Wind Speed and Pressure. A trend can be:

- Rising (📈): the three most recent measurements are increasing
- Falling (📉): the three most recent measurements are falling
- Steady: neither of the above

### Date/Time Stamp on Each Reading

Each reading is now timestamped with the current time and date.

### All Stations Summary

On the main dashboard, the latest conditions (excluding readings) for each station are displayed.

### Station/Reading Delete Support

Delete buttons have been added next to each reading and station for easier data management.

### Deployed to the Cloud

The application is now deployed to a cloud service for wider accessibility.

### Members Can Edit Their Personal Details

Members now have the option to edit their personal details.

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
- View the max/min readings and trends for temperature, wind speed, and pressure in the station report.
- Delete readings and stations as needed.
- Edit your personal details via the account settings.