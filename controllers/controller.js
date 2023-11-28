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

//Get single post
const getSinglePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await posts.findById(postId);
    if (!post) {
      console.error("Post not found");
      return res.status(404).render("404", { title: "404" });
    }
    // Render the page with the post details
    res.render("singlePost", { title: "Post Details", post });
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
    const id = req.params.id;
    const comment = new Comment({
      text: req.body.commentText,
      post: id,
    });
    await comment.save();

    const postRelated = await posts.findById(id);
    if (!postRelated) {
      console.error("Post not found");
      return res.status(404).render("404", { title: "404" });
    }

    postRelated.comments.push(comment);
    await postRelated.save();

    // Redirect to the page displaying the single post
    res.redirect(`/posts/${id}`);
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
  getSinglePost,
  postMsg,
  getPageNotFound,
  deletePost,
  redirectToMainPage,
  newComment,
};

export default requestMethods;
