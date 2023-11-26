import posts from "../models/Post.js";
import comments from "../models/Comment.js";
//get the main page
const getMainPage = async (req, res) => {
  try {
    const result = await posts.find().sort({ createdAt: -1 });
    res.render("index", { title: "Home", posts: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
//post message
const postMsg = async (req, res) => {
  try {
    const post = new posts(req.body);
    post.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Add Comment
const addComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// delete post
const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    await posts.deletePost(postId);
    res.redirect("/");
  } catch {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
const getNotFound = (req, res) => {
  res.status(404).render("404", { title: "404" });
};

const requestMethods = {
  getMainPage,
  postMsg,
  getNotFound,
  deletePost,
  addComment,
};

export default requestMethods;
