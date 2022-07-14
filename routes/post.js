var express = require("express");
var router = express.Router();
const ExpressError = require("../utils/expressError");
const replyRouter = require("./reply");
const { isLoggedIn, isAuthor } = require("../utils/authMiddleware");
const post = require("../controllers/post");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.use("/:id/replies", replyRouter);

// GET post form
router.get("/new", isLoggedIn, post.renderNewForm);

// GET edit form
router.get("/:id/edit", isLoggedIn, isAuthor, post.renderEditForm);

// CREATE Post
router.post("/", isLoggedIn, upload.single("image"), post.createNewPost);

router
  .route("/:id")
  // READ a single post
  .get(post.renderPost)
  // UPDATE the Post
  .put(isLoggedIn, upload.single("image"), isAuthor, post.updatePost)
  // DELETE the post
  .delete(isLoggedIn, isAuthor, post.deletePost);

module.exports = router;
