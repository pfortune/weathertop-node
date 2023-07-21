import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { homeController } from "./controllers/home-controller.js";

export const router = express.Router();

router.get("/", homeController.index);
router.get("/dashboard", dashboardController.index);
router.get("/about", aboutController.index);