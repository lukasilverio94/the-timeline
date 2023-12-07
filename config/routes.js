import express from "express";
const router = express.Router();
import postController from "../controllers/postController.js";
import userController from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";

router.get("/", userController.renderHomePage);
router.get("/logout", userController.logOut);
router.post("/signup", userController.signup_post);
router.post("/login", userController.userLogin);
router.get("/home", isAuth.userIsLoggedIn, postController.getAllPosts);
router.get("/posts", isAuth.userIsLoggedIn, postController.redirectToMainPage);
router.get("/posts/:id", isAuth.userIsLoggedIn, postController.getSinglePost);
router.post("/posts/:id", postController.newComment);
router.post("/posts", postController.postMsg);
router.get(
  "/posts/delete/:id",
  isAuth.userIsLoggedIn,
  postController.deletePost
);

router.get("*", postController.getPageNotFound);

export default router;
