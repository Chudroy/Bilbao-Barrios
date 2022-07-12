const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

// GET register form
router.get("/register", function (req, res, next) {
  res.render("users/register");
});

// CREATE User
router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body.user;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, function (err) {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to BilbaoBarrios!");
        res.redirect("/");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("register");
    }
  })
);

//GET login form

router.get("/login", async function (req, res, next) {
  res.render("users/login");
});

// LOGIN
/**
 * to authenticate, req.body has to have username and password variables in
 * req.body with those exact variable names
 */
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  async function (req, res, next) {
    const redirectUrl = req.session.returnTo || "/";
    req.flash("success", "Welcome back!");
    res.redirect(redirectUrl);
  }
);

router.get("/logout", async (req, res) => {
  req.logout();
  req.flash("success", "Goodbye!");
  res.redirect("/");
});

module.exports = router;
