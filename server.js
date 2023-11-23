require("dotenv").config();
const express = require("express");
const route = require("./config/routes");
const app = express();
const port = process.env.PORT;

require("./config/mongo");
app.set("view engine", "ejs");
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route);
app.listen(port, () => console.log(`Server has started at port: ${port}`));
