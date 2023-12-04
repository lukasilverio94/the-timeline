import User from "../models/User.js";

//Handle Errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

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
  res.render("signup", { title: "Sign Up" });
};

const login_get = async (req, res) => {
  res.render("login", { title: "Log In" });
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const authController = {
  signup_get,
  login_get,
  signup_post,
};

export default authController;
