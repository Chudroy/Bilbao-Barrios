const catchAsync = require("../utils/catchAsync");
const Post = require("../models/post");
const Reply = require("../models/reply");

module.exports.redirectToPost = (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);
  res.redirect(`/post/${id}`);
};

module.exports.renderReplyEditForm = catchAsync(async (req, res, next) => {
  const { id, replyID } = req.params;
  const post = await Post.findById(id);
  const reply = await Reply.findById(replyID);
  if (!reply) {
    req.flash("error", "Cannot find Reply");
    return res.redirect(`/post/${id}`);
  }
  console.log(reply);
  res.render("reply/editReply", { reply, post });
});

module.exports.createReply = catchAsync(async function (req, res, next) {
  const { id } = req.params;
  // Create new reply
  let newReply = new Reply(req.body.reply);
  newReply.author = req.user._id;
  newReply.date = Date.now();

  // Add ID of post as original post of reply
  newReply.originalPost = id;
  await newReply.save();

  // Add replyID to post
  let post = await Post.findById(id);
  post.replies.push(newReply._id);
  await post.save();

  // Redirect to post
  req.flash("success", "successfully posted comment");
  res.redirect(`/post/${id}`);
});

module.exports.updateReply = catchAsync(async (req, res) => {
  const { id, replyID } = req.params;
  // check if reply exists
  const reply = await Reply.findById(replyID);
  if (!reply.author.equals(req.user._id)) {
    req.flash("error", "Permission Denied");
    return res.redirect(`/post/${id}`);
  }
  // Get the reply by id, edit and run validate
  const editedReply = await Reply.findByIdAndUpdate(
    replyID,
    { ...req.body.reply },
    { useFindAndModify: false, runValidators: true }
  );
  res.redirect(`/post/${id}`);
});

module.exports.deleteReply = catchAsync(async (req, res, next) => {
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
  req.flash("success", "successfully deleted comment");
  res.redirect(`/post/${id}`);
});
