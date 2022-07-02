var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const ExpressError = require("../utils/expressError");
const app = require("../app");

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "123") {
    next();
  } else {
    throw new ExpressError("invalid password", 401);
  }
};

/* GET home page. */
router.get("/", verifyPassword, async function (req, res, next) {
  const posts = await Post.find({});
  res.render("secret");
});

module.exports = router;
