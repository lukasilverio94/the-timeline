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

//new comment
const newComment = async (req, res) => {
  try {
    const postId = req.params.id; // Assuming the post ID is included in the URL
    const post = await posts.findById(postId);

    if (!post) {
      // Handle the case where the post is not found
      res.status(404).render("404", { title: "404" });
      return;
    }

    res.render("commentPage", { title: "New Comment", post });
  } catch (err) {
    console.log(err);
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
const getPageNotFound = (req, res) => {
  res.status(404).render("404", { title: "404" });
};

const redirectToMainPage = async (req, res) => {
  try {
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
const requestMethods = {
  getMainPage,
  postMsg,
  getPageNotFound,
  deletePost,
  redirectToMainPage,
  newComment,
};

export default requestMethods;
