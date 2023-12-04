import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

//Get All Posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("comments");
    res.render("index", {
      title: "Home",
      posts,
      err: "",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

//Make Post
const postMsg = async (req, res) => {
  try {
    if (req.body.post.length < 25) {
      const posts = await Post.find({}).sort({ createdAt: -1 });
      return res.render("index", {
        title: "Home",
        posts,
        err: "Post should be at least 25 characters long.",
      });
    }
    const post = new Post(req.body);
    await post.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

//Get single post
const getSinglePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      console.error("Post not found");
      return res.status(404).render("404", {
        title: "404",
      });
    }
    res.render("singlePost", {
      title: "Post Details",
      post,
      err: "Post should be at least 25 characters long.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

//new comment
const newComment = async (req, res) => {
  try {
    const postId = req.params.id;
    if (req.body.commentText.length < 25) {
      const post = await Post.findById(postId);
      return res.render("singlePost", {
        title: "Post",
        post,
        err: "Post should be at least 25 characters long.",
      });
    }
    const commentText = req.body.commentText;
    const comment = new Comment({
      commentText,
      post: postId,
    });

    await comment.save();
    const post = await Post.findById(postId);
    post.comments.push(comment._id);
    await post.save();
    // Redirect to the main page after adding the comment
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
    await Post.deletePost(postId);
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

const postController = {
  getAllPosts,
  getSinglePost,
  postMsg,
  getPageNotFound,
  deletePost,
  redirectToMainPage,
  newComment,
};

export default postController;