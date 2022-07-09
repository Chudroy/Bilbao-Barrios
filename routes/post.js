var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/expressError");
const replyRouter = require("./reply");
const isLoggedIn = require("../utils/isLoggedIn");
const passport = require("passport");

router.use("/:id/replies", replyRouter);

// GET post form
router.get("/new", isLoggedIn, function (req, res, next) {
  res.render("post/new");
});

// GET edit form
router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render("post/edit", { post });
  })
);

// CREATE Post
router.post(
  "/",
  isLoggedIn,
  catchAsync(async function (req, res, next) {
    if (!req.body.post) throw new ExpressError("Invalid Post Data", 400);
    let newPost = new Post(req.body.post);
    newPost.date = Date.now();
    newPost.author = "Anonymous";
    await newPost.save();
    req.flash("success", "Succesfully made a new post");
    res.redirect(`/post/${newPost._id}`);
  })
);

// READ a single post
router.get(
  "/:id",
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const post = await Post.findById(id).populate("replies");
    if (!post) {
      req.flash("error", "Cannot find that post");
      res.redirect("/");
    }
    res.render("post/show", { post });
  })
);

// UPDATE the Post
router.put(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    // Get the post by id, edit and run validate
    const editedPost = await Post.findByIdAndUpdate(
      id,
      { ...req.body.post },
      { useFindAndModify: false, runValidators: true }
    );
    res.redirect(`/post/${editedPost._id}`);
  })
);

// DELETE the post
router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    // DELETE post
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    req.flash("success", "successfully deleted post");
    res.redirect("/");
  })
);

module.exports = router;
