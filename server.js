import { config } from "dotenv";
config();
import express from "express";
import router from "./config/routes.js";
import "./config/mongo.js";

const app = express();
app.use(express.static("public"));
const port = process.env.PORT;

app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => console.log(`Server has started at port: ${port}`));
