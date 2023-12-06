import User from "../models/User.js";
import bcrypt from "bcrypt";

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

    console.log("Entered Password:", password);
    console.log("Stored Password:", user.password);

    // Compare the entered password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    console.log("Password Comparison Result:", isPasswordCorrect);

    if (isPasswordCorrect) {
      console.log("Password is correct");
      // Redirect or perform the desired action upon successful login.
      res.redirect("/home");
    } else {
      console.log("Password is incorrect");
      // Handle incorrect password case.
      res.render("signup", { err: "Incorrect password", success: "" });
    }
  } catch (err) {
    console.error("Login error:", err);
    // Handle other login errors.
    res.render("signup", { err: "Login failed", success: "" });
  }
};

const authController = {
  signup_get,
  signup_post,
  userLogin,
};

export default authController;
