//Express and Router
const express = require("express");
const router = express.Router();
const replyRouter = require("./reply");
// Auth
const { isLoggedIn, isAuthor } = require("../utils/authMiddleware");
// Post controller
const post = require("../controllers/post");
// Multer
const multer = require("multer");
const { storage } = require("../cloudinary");
// JOI Validation
const {
  validatePostMiddleware,
  validatePostMulter,
} = require("../utils/joiValidation");

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    cb(null, validatePostMulter(req.body));
  },
});

router.use("/:id/replies", replyRouter);

// GET post form
router.get("/new", isLoggedIn, post.renderNewForm);

// GET edit form
router.get("/:id/edit", isLoggedIn, isAuthor, post.renderEditForm);

// CREATE Post
router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  validatePostMiddleware,
  post.createNewPost
);

router
  .route("/:id")
  // READ a single post
  .get(post.renderPost)
  // UPDATE the Post
  .put(
    isLoggedIn,
    upload.single("image"),
    validatePostMiddleware,
    isAuthor,
    post.updatePost
  )
  // DELETE the post
  .delete(isLoggedIn, isAuthor, post.deletePost);

module.exports = router;
