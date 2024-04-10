const User = require("../models/user");
const passport = require("../config/passport-config")

const asyncHandler = require("express-async-handler");

exports.render_landing = asyncHandler(async (req, res, next) => {
  const page = "sign-in"
  res.render('landing', { title: 'Inventory Management App', page: page });
});

exports.render_create_account = asyncHandler(async (req, res, next) => {
  const page = "create-account"
  res.render('landing', { title: 'Inventory Management App', page: page });
});

exports.create_account = asyncHandler(async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const usernameTaken = await User.findOne({ username: username, });
    if (!usernameTaken) {
      try {
        const user = await User.create({
          username: username,
          password: password,
          expiresAfter: new Date()
        });
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          res.locals.currentUser = req.user;
          res.redirect("/categories");
        })
      } catch (err) {
        return next(err);
      }
    } else {
      res.redirect("/");
    }
  } catch (err) {
    return next(err);
  }

});

exports.sign_out = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });

});

exports.sign_in = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/categories",
    failureRedirect: "/"
  })(req, res, next);
});

exports.set_currentUser = asyncHandler(async (req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});