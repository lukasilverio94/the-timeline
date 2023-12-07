//Imports
import User from "../models/User.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import { config } from "dotenv";
import { userInfo } from "os";
config();

//Handle Errors Function
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
  console.log("Errors in handleErrors:", errors);
  return errors;
};

// Validation function for checking empty fields
const checkEmptyFields = (data, errors) => {
  Object.keys(data).forEach((field) => {
    if (!data[field]) {
      errors[field] = `Please enter a ${field}`;
    }
  });
};

const renderHomePage = async (req, res) => {
  res.render("signup", { err: "", success: "" });
};

const signup_post = async (req, res) => {
  const { username, email, password } = req.body;
  let errors = { username: "", email: "", password: "" };
  checkEmptyFields({ username, email, password }, errors);

  if (errors.username || errors.email || errors.password) {
    return res.render("signup", { err: errors, success: "" });
  }

  try {
    const saltRounds = 12;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create a new user with the hashed password
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .render("signup", { err: "", success: "Account created successfully!" });
    user.save();
  } catch (err) {
    const errors = handleErrors(err);
    res.render("signup", { err: errors, success: "" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("signup", { err: "User doesn't exist", success: "" });
    }

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

    if (isPasswordCorrect) {
      //AUTH PASSWORD CORRECT - TOKEN
      let userInfoForToken = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      let userToken = jwt.sign({ userInfoForToken }, process.env.SECRET);

      res.cookie("isLoggedIn", true);
      res.cookie("jwt", userToken);
      res.redirect("/home");
    } else {
      res.render("signup", { err: "Incorrect password", success: "" });
    }
  } catch (err) {
    res.render("signup", { err: "Login failed", success: "" });
  }
};

const logOut = (req, res) => {
  res.clearCookie("isLoggedIn");
  res.clearCookie("jwt");
  res.redirect("/");
};

const authController = {
  renderHomePage,
  signup_post,
  userLogin,
  logOut,
};

export default authController;
