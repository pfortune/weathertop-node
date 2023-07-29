import express from "express";
import { flash } from "./utils/flash.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { homeController } from "./controllers/home-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { authController } from "./controllers/auth-controller.js";

export const router = express.Router();

router.use(flash);

// Home page
router.get("/", homeController.index);

// Dashboard page
router.get("/dashboard", dashboardController.index);
router.post("/dashboard/add", dashboardController.addStation);

// Station page
router.get("/station/:id", stationController.index);
router.post("/station/:id/add", stationController.addReading);

// Authentication
router.get("/login", authController.login);
router.get("/register", authController.register);
// router.post("/register", authController.registerUser);
// router.post("/authenticate", authController.authenticate);
// router.get("/logout", authController.logout);

// About page
router.get("/about", aboutController.index);
