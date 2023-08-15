import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import { router } from "./routes.js";
import './helpers/general-helpers.js';
import './helpers/conversion-helpers.js';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use("/", router);

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log(`Weathertop started on http://localhost:${listener.address().port}`);
});
