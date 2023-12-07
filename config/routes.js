import express from "express";
const router = express.Router();
import postController from "../controllers/postController.js";
import userController from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";

router.get("/", isAuth.checkStatusLogin, userController.renderHomePage);
router.get("/logout", userController.logOut);
router.post("/signup", userController.signup_post);
router.post("/login", userController.userLogin);
router.get("/home", isAuth.userIsLoggedIn, postController.getAllPosts);
router.get("/posts", postController.redirectToMainPage);
router.post("/posts/:userId", isAuth.userIsLoggedIn, postController.postMsg);
router.get("/posts/:id", postController.getSinglePost);
router.post("/posts/:id", postController.newComment);
router.get("/posts/delete/:id", postController.deletePost);

router.get("*", postController.getPageNotFound);

export default router;
