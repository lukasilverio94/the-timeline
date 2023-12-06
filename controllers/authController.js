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
  res.render("signup", { err: "" });
};

const signup_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.render("signup", { err: errors });
  }
};

const authController = {
  signup_get,
  signup_post,
};

export default authController;
