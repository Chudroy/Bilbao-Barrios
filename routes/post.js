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
} = require("../utils/validation");

const path = require("path");
const ExpressError = require("../utils/expressError");

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      // return cb(new ExpressError("Only images are allowed", 400));
      return cb(null, false);
    }
    cb(null, validatePostMulter(req.body));
  },
});

// Nested Reply Router
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

// Update Post Likes
router.post("/updateLikes", post.updateLikes);

module.exports = router;
