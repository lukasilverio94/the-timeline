const userIsLoggedIn = (req, res, next) => {
  if (req.cookies.isLoggedIn === "true") {
    next();
  } else {
    res.redirect("/");
  }
};

const isAuth = {
  userIsLoggedIn,
};

export default isAuth;
