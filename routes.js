import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { homeController } from "./controllers/home-controller.js";
import { stationController } from "./controllers/station-controller.js";

export const router = express.Router();

// Home page
router.get("/", homeController.index);

// Dashboard page
router.get("/dashboard", dashboardController.index);
router.post("/dashboard/add", dashboardController.addStation);

// Station page
router.get("/station/:id", stationController.index);
router.post("/station/:id/add", stationController.addReading);

// About page
router.get("/about", aboutController.index);