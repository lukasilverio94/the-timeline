import express from "express";

const route = express.Router();
import requestMethods from "../controllers/controller.js";

route.get("/", requestMethods.getMainPage);
route.get("/posts", requestMethods.redirectToMainPage);
route.get("/posts/new-comment/:id", requestMethods.newComment);
route.post("/posts", requestMethods.postMsg);
route.get("/posts/delete/:id", requestMethods.deletePost);
route.get("*", requestMethods.getPageNotFound);

export default route;
