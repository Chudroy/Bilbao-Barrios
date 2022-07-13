var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/expressError");
const replyRouter = require("./reply");
const { isLoggedIn, isAuthor } = require("../utils/authMiddleware");
const post = require("../controllers/post");

router.use("/:id/replies", replyRouter);

// GET post form
router.get("/new", isLoggedIn, post.renderNewForm);

// GET edit form
router.get("/:id/edit", isLoggedIn, isAuthor, post.renderEditForm);

// CREATE Post
router.post("/", isLoggedIn, post.createNewPost);

// READ a single post
router.get("/:id", post.renderPost);

// UPDATE the Post
router.put("/:id", isLoggedIn, isAuthor, post.updatePost);

// DELETE the post
router.delete("/:id", isLoggedIn, isAuthor, post.deletePost);

module.exports = router;
