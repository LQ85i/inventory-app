const User = require("../models/user");
const passport = require("../config/passport-config")
const bcrypt = require("bcryptjs");

const asyncHandler = require("express-async-handler");

let nameTakenError = false;
let signInError = false;

const authError = (next) => {
  const customError = new Error("You must be signed in to view this page");
  customError.code = "401"
  return () => next(customError);
}

exports.render_landing = asyncHandler(async (req, res, next) => {
  const page = "sign-in"
  nameTakenError = false;
  res.render('landing', { title: 'Inventory Management App', page: page, signInError: signInError });
});

exports.render_create_account = asyncHandler(async (req, res, next) => {
  const page = "create-account"
  signInError = false;
  res.render('landing', { title: 'Inventory Management App', page: page, nameTakenError: nameTakenError });
});

exports.create_account = asyncHandler(async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const usernameTaken = await User.findOne({ username: username, });
    if (!usernameTaken) {
      try {
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
          if (err) {
            return next(err);
          }
          const user = await User.create({
            username: username,
            password: hashedPassword,
            expiresAfter: new Date()
          });
          req.login(user, function (err) {
            if (err) {
              return next(err);
            }
            res.locals.currentUser = req.user;
            res.redirect("/categories");
          })
        });

      } catch (err) {
        return next(err);
      }
    } else {
      nameTakenError = true;
      res.redirect("/create-account");
    }
  } catch (err) {
    return next(err);
  }

});

exports.sign_out = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    authError(next)();
  } else {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      signInError = false;
      nameTakenError = false;
      res.redirect("/");
    });
  }
});

exports.sign_in = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      signInError = true;
      return res.redirect("/");
    }
    req.logIn(user, function (err) {
      if (err) {
        signInError = true;
        return next(err);
      }
      signInError = false;
      return res.redirect("/categories");
    });
  })(req, res, next);
});

exports.set_currentUser = asyncHandler(async (req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});