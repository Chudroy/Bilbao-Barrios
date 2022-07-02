var express = require("express");
const mongoose = require("mongoose");
const app = require("../app");
var router = express.Router();
const Post = require("../models/post");
const Reply = require("../models/reply");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/expressError");

router.get("/new", function (req, res, next) {
  res.render("post/new");
});

router.post(
  "/",
  catchAsync(async function (req, res, next) {
    if (!req.body.post) throw new ExpressError("Invalid Post Data", 400);
    let newPost = new Post(req.body.post);
    newPost.date = Date.now();
    await newPost.save();
    res.redirect(`/post/${newPost._id}`);
  })
);

// Post a reply
router.post(
  "/:id",
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    // Create new reply
    let newReply = new Reply(req.body.reply);
    newReply.author = "Anonymous";
    newReply.date = Date.now();
    newReply.originalPost = id;
    await newReply.save();

    // Add replyID to post
    let post = await Post.findById(id);
    post.replies.push(newReply._id);
    await post.save();
    res.redirect(`/post/${id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const post = await Post.findById(id).populate("replies");

    res.render("post/show", { post });
  })
);

router.get(
  "/:id/edit",
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render("post/edit", { post });
  })
);

router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const editedPost = await Post.findByIdAndUpdate(
      id,
      { ...req.body.post },
      { useFindAndModify: false, runValidators: true }
    );
    res.redirect(`/post/${editedPost._id}`);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.redirect("/");
  })
);

module.exports = router;
