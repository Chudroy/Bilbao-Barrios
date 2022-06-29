var express = require("express");
const mongoose = require("mongoose");
const app = require("../app");
var router = express.Router();
const Post = require("../models/post");
const catchAsync = require("../utils/catchAsync");

router.get("/new", async function (req, res, next) {
  res.render("post/new");
});

router.post(
  "/",
  catchAsync(async function (req, res, next) {
    let newPost = new Post(req.body.post);
    newPost.date = Date.now();
    await newPost.save();
    res.redirect(`/post/${newPost._id}`);
  })
);

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render("post/show", { post });
});

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
      { useFindAndModify: false }
    );
    res.redirect(`/post/${editedPost._id}`);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    res.redirect("/");
  })
);

module.exports = router;
