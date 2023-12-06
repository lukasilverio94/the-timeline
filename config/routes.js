import express from "express";
const router = express.Router();
import postController from "../controllers/postController.js";
import authController from "../controllers/authController.js";

router.get("/", authController.signup_get);
router.get("/home", postController.getAllPosts);
router.post("/signup", authController.signup_post);
router.post("/login", authController.userLogin);
router.get("/posts", postController.redirectToMainPage);
router.get("/posts/:id", postController.getSinglePost);
router.post("/posts/:id", postController.newComment);
router.post("/posts", postController.postMsg);
router.get("/posts/delete/:id", postController.deletePost);
router.get("*", postController.getPageNotFound);

export default router;
