var express = require("express");
var router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const Post = require("../models/post");
const Reply = require("../models/reply");

// CREATE reply
router.post(
  "/",
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

    // Redirect to post
    res.redirect(`/post/${id}`);
  })
);

// READ Reply

// UPDATE Reply

// DELETE Reply
router.delete(
  "/:replyID",
  catchAsync(async (req, res, next) => {
    const { id, replyID } = req.params;

    // DELETE reply
    await Reply.findByIdAndDelete(replyID);

    // DELETE reference to reply in Original Post
    let originalPost = await Post.findByIdAndUpdate(id, {
      $pull: { replies: replyID },
    });

    // OR await originalPost.replies.pull(replyID);
    await originalPost.save();

    // Redirect to post
    res.redirect(`/post/${id}`);
  })
);

module.exports = router;
