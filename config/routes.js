import express from "express";
import { check, body } from "express-validator"; // Import express-validator functions
const router = express.Router();
import postController from "../controllers/postController.js";
import authController from "../controllers/authController.js";

router.get("/", postController.getAllPosts);
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.get("/posts", postController.redirectToMainPage);
router.get("/posts/:id", postController.getSinglePost);
router.post("/posts/:id", postController.newComment);
router.post("/posts", postController.postMsg);
router.get("/posts/delete/:id", postController.deletePost);
router.get("*", postController.getPageNotFound);

export default router;
