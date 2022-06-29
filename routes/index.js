var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const catchAsync = require("../utils/catchAsync");

/* GET home page. */
router.get("/", async function (req, res, next) {
  my_callback(req, res, next).catch((e) => {
    next(e);
  });
});

let my_callback = async function (req, res, next) {
  const posts = await Post.find({});
  res.render("index", { title: "Homepage", posts });
};

module.exports = router;
