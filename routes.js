import express from "express";
import { flash } from "./middleware/flash.js";
import { attachUser } from "./middleware/attach-user.js";
import { handle404Error } from "./middleware/handle-404.js";
import { authGuard } from "./middleware/auth-guard.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { homeController } from "./controllers/home-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { authController } from "./controllers/auth-controller.js";

export const router = express.Router();

router.use(flash);
router.use(attachUser);

// Home page
router.get("/", authGuard(true, "/dashboard"), homeController.index);

// Dashboard page
router.get("/dashboard", authGuard(), dashboardController.index);
router.post("/dashboard/add", authGuard(), dashboardController.addStation);
router.post("/dashboard/:id/delete", authGuard(), dashboardController.deleteStation);

// Station page
router.get("/station/:id", authGuard(), stationController.index);
router.post("/station/:id/add", authGuard(), stationController.addReading);
router.post("/station/:id/delete/:readingid", authGuard(), stationController.deleteReading);
router.post("/station/:id/auto", authGuard(), stationController.addReadingFromAPI);

// Authentication
router.get("/login", authController.login);
router.get("/register", authGuard(true, "/dashboard"), authController.register);
router.post("/register", authController.registerUser);
router.post("/authenticate", authController.authenticate);
router.get("/logout", authGuard(), authController.logout);
router.get("/account", authGuard(), authController.showAccount);
router.post("/account", authGuard(), authController.updateAccount);

// About page
router.get("/about", aboutController.index);

// 404 Catch-all
router.use(handle404Error);
