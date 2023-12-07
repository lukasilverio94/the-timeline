import jwt from "jsonwebtoken";
const { verify, decode } = jwt;
import { config } from "dotenv";
config();
const userIsLoggedIn = (req, res, next) => {
  if (req.cookies.isLoggedIn === "true") {
    jwt.verify(req.cookies.jwt, process.env.SECRET, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.locals.username = data.userInfoForToken.username;
        res.locals.email = data.userInfoForToken.email;
        res.locals.id = data.userInfoForToken.id;
        next();
      }
    });
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
