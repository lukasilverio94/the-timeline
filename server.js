import { config } from "dotenv";
config();
import express from "express";
import route from "./config/routes.js";
import "./config/mongo.js";

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);

app.listen(port, () => console.log(`Server has started at port: ${port}`));
