import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

// Get All Posts
const getAllPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .populate("comments")
    .populate("author")
    .then((result) => {
      console.log(result);
      res.render("index", {
        title: "Home",
        posts: result,
        err: "",
      });
    })
    .catch((err) => console.log(err));
};

// Make Post
const postMsg = (req, res) => {
  const post = req.body.post;
  if (post.length < 25) {
    Post.find({})
      .sort({ createdAt: -1 })
      .then((posts) => {
        res.render("index", {
          title: "Home",
          posts,
          err: "Post should be at least 25 characters long.",
        });
      })
      .catch((err) => console.log(err));
  } else {
    const postData = {
      post: req.body.post,
      author: req.params.userId,
    };
    const newPost = new Post(postData);
    newPost
      .save()
      .then(() => res.redirect("/home"))
      .catch((err) => console.log(err));
  }
};

// Get single post
const getSinglePost = (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        console.error("Post not found");
        res.status(404).render("404", {
          title: "404",
        });
      } else {
        res.render("singlePost", {
          title: "Post Details",
          post,
          err: "Post should be at least 25 characters long.",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

// New comment
const newComment = (req, res) => {
  const postId = req.params.id;
  if (req.body.commentText.length < 25) {
    Post.findById(postId)
      .then((post) => {
        res.render("singlePost", {
          title: "Post",
          post,
          err: "Post should be at least 25 characters long.",
        });
      })
      .catch((err) => console.log(err));
  } else {
    const commentText = req.body.commentText;
    const comment = new Comment({
      commentText,
      post: postId,
    });

    comment
      .save()
      .then(() => Post.findById(postId))
      .then((post) => {
        post.comments.push(comment._id);
        return post.save();
      })
      .then(() => res.redirect("/home"))
      .catch((err) => console.error(err));
  }
};

// Delete post
const deletePost = (req, res) => {
  const postId = req.params.id;
  Post.deletePost(postId)
    .then(() => res.redirect("/home"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

const getPageNotFound = (req, res) => {
  res.status(404).render("404", { title: "404" });
};

const redirectToMainPage = (req, res) => {
  res.redirect("/");
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
