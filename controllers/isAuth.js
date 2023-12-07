import jwt from "jsonwebtoken";
const { verify, decode } = jwt;
import { config } from "dotenv";
config();

const userIsLoggedIn = (req, res, next) => {
  console.log("Before jwt.verify");
  if (req.cookies.isLoggedIn === "true") {
    console.log("Inside jwt.verify callback");
    jwt.verify(req.cookies.jwt, process.env.SECRET, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data.userInfoForToken);
      }
    });
    console.log("After jwt.verify");
    next();
  } else {
    res.redirect("/");
  }
};

const checkStatusLogin = (req, res, next) => {
  if (req.cookies.isLoggedIn === "true") {
    res.redirect("/home");
  } else {
    next();
  }
};

const isAuth = {
  userIsLoggedIn,
  checkStatusLogin,
};

export default isAuth;
