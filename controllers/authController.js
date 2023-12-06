import User from "../models/User.js";

//Handle Errors
const handleErrors = (err) => {
  let errors = { username: "", email: "", password: "" };

  //duplicate email handler(err.code)
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  //Handling Other Errors (validation)
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const signup_get = async (req, res) => {
  res.render("signup", { err: "", success: "" });
};

const signup_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res
      .status(201)
      .render("signup", { err: "", success: "Account created successfully!" });
    user.save();
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.render("signup", { err: errors, success: "" });
  }
};

const userLogin = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.render("signup", { err: "User doesn't exist", success: "" });
  } else {
    res.redirect("/home");
  }
};

const authController = {
  signup_get,
  signup_post,
  userLogin,
};

export default authController;
