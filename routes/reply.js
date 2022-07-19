var express = require("express");
const { isLoggedIn, isReplyAuthor } = require("../utils/authMiddleware");
var router = express.Router({ mergeParams: true });
const reply = require("../controllers/reply");

const { validateReplyMiddleware } = require("../utils/validation");

// REDIRECT
router.get("/", reply.redirectToPost);

// GET reply edit form
router.get("/:replyID/edit", reply.renderReplyEditForm);

// CREATE reply
router.post("/", isLoggedIn, validateReplyMiddleware, reply.createReply);

// READ Reply

// UPDATE Reply
router.put(
  "/:replyID/edit",
  isLoggedIn,
  isReplyAuthor,
  validateReplyMiddleware,
  reply.updateReply
);

// DELETE Reply
router.delete("/:replyID", isLoggedIn, isReplyAuthor, reply.deleteReply);

module.exports = router;
