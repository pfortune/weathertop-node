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
router.use(attachUser);

// Home page
router.get("/", homeController.index);

// Dashboard page
router.get("/dashboard", dashboardController.index);
router.post("/dashboard/add", dashboardController.addStation);
// router.post("/dashboard/delete", dashboardController.deleteStation);
// router.get("/dashboard/page/:page", dashboardController.index);

// Station page
router.get("/station/:id", stationController.index);
router.post("/station/:id/add", stationController.addReading);
// router.post("/station/:id/delete", stationController.deleteReading);

// Authentication
router.get("/login", authController.login);
router.get("/register", authController.register);
router.post("/register", authController.registerUser);
router.post("/authenticate", authController.authenticate);
router.get("/logout", authController.logout);
router.get("/account", authController.showAccount);
router.post("/account", authController.updateAccount);

// About page
router.get("/about", aboutController.index);

// 404 Catch-all
router.use(handle404Error);
