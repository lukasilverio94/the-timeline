const express = require("express");

const route = express.Router();
const controllerFun = require("../controller/controller");

route.get("/", controllerFun.getMainPage);
route.post("/posts", controllerFun.postMsg);
route.get("/posts/delete/:id", controllerFun.deletePost);
route.get("*", controllerFun.getNotFound);

module.exports = route;
