import express from "express";
import { flash } from "./middleware/flash.js";
import { attachUser } from "./middleware/attach-user.js";
import { handle404Error } from "./middleware/handle-404.js";
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
router.get("/dashboard", attachUser(), dashboardController.index);
router.post("/dashboard/add", attachUser(), dashboardController.addStation);
router.post("/dashboard/:id/delete", attachUser(), dashboardController.deleteStation);
// router.get("/dashboard/page/:page", dashboardController.index);

// Station page
router.get("/station/:id", attachUser(), stationController.index);
router.post("/station/:id/add", attachUser(), stationController.addReading);
router.post("/station/:id/delete/:readingid", attachUser(), stationController.deleteReading);
router.post("/station/:id/auto", attachUser(), stationController.addReadingFromAPI);

// Authentication
router.get("/login", authController.login);
router.get("/register", authController.register);
router.post("/register", authController.registerUser);
router.post("/authenticate", authController.authenticate);
router.get("/logout", attachUser(), authController.logout);
router.get("/account", attachUser(), authController.showAccount);
router.post("/account", attachUser(), authController.updateAccount);

// About page
router.get("/about", aboutController.index);

// 404 Catch-all
router.use(handle404Error);
