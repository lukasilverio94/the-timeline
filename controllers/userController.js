//Imports
import User from "../models/User.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

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

  return errors;
};

const signup_get = async (req, res) => {
  console.log(req.cookies);
  res.render("signup", { err: "", success: "" });
};

const signup_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const saltRounds = 10;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
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
    console.log(errors);
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
    // Compare the entered password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("Password is correct: " + isPasswordCorrect);
    if (isPasswordCorrect) {
      //AUTH
      res.cookie("isLoggedIn", true);
      console.log(req.cookies);
      res.redirect("/home");
    } else {
      res.render("signup", { err: "Incorrect password", success: "" });
    }
  } catch (err) {
    res.render("signup", { err: "Login failed", success: "" });
  }
};

const logOut = (req, res) => {
  res.cookie("isLoggedIn", false);
  res.redirect("/");
};

const authController = {
  signup_get,
  signup_post,
  userLogin,
  logOut,
};

export default authController;
