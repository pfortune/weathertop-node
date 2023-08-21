import express from "express";
import { flash } from "./middleware/flash.js";
import { attachUser } from "./middleware/attach-user.js";
import { handle404Error } from "./middleware/handle-404.js";
import { requireAuth } from "./middleware/require-auth.js";
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
router.get("/dashboard", requireAuth(), dashboardController.index);
router.post("/dashboard/add", requireAuth(), dashboardController.addStation);
router.post("/dashboard/:id/delete", requireAuth(), dashboardController.deleteStation);

// Station page
router.get("/station/:id", requireAuth(), stationController.index);
router.post("/station/:id/add", requireAuth(), stationController.addReading);
router.post("/station/:id/delete/:readingid", requireAuth(), stationController.deleteReading);
router.post("/station/:id/auto", requireAuth(), stationController.addReadingFromAPI);

// Authentication
router.get("/login", authController.login);
router.get("/register", authController.register);
router.post("/register", authController.registerUser);
router.post("/authenticate", authController.authenticate);
router.get("/logout", requireAuth(), authController.logout);
router.get("/account", requireAuth(), authController.showAccount);
router.post("/account", requireAuth(), authController.updateAccount);

// About page
router.get("/about", aboutController.index);

// 404 Catch-all
router.use(handle404Error);
