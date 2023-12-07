//Imports
import { config } from "dotenv";
config();
import express from "express";
import router from "./config/routes.js";
import "./config/mongo.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(router);

app.listen(port, () => console.log(`Server has started at port: ${port}`));
