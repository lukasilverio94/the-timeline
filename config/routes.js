import express from "express";

const router = express.Router();
import requestMethods from "../controllers/controller.js";

router.get("/", requestMethods.getAllPosts);
router.get("/posts", requestMethods.redirectToMainPage);
router.get("/posts/:id", requestMethods.getSinglePost);
router.post("/posts/:id", requestMethods.newComment);
router.post("/posts", requestMethods.postMsg);
router.get("/posts/delete/:id", requestMethods.deletePost);
router.get("*", requestMethods.getPageNotFound);

export default router;
