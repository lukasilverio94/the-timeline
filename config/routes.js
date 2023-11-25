import express from "express";

const route = express.Router();
import requestMethods from "../controllers/controller.js";

route.get("/", requestMethods.getMainPage);
route.post("/posts", requestMethods.postMsg);
route.post("/posts/add-comment", requestMethods.addComment);
route.get("/posts/delete/:id", requestMethods.deletePost);
route.get("*", requestMethods.getNotFound);

export default route;
