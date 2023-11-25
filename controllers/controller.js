import posts from "../models/timeline.js";

//get the main page
const getMainPage = (req, res) => {
  posts
    .find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "Home", posts: result });
    })
    .catch((err) => console.log(err));
};
//post message
const postMsg = (req, res) => {
  const post = new posts(req.body);
  post
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
};

// Add Comment
const addComment = (req, res) => {
  res.send('test comment page')
}
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
  addComment
};

export default requestMethods;
