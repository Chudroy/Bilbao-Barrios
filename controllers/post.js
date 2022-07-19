const Post = require("../models/post");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/expressError");
const cloudinary = require("cloudinary");

module.exports.index = async function (req, res, next) {
  try {
    const posts = await Post.find({});
    res.render("index", { title: "Homepage", posts });
  } catch (e) {
    console.log("index error", e);
  }
};

module.exports.renderNewForm = function (req, res, next) {
  res.render("post/new");
};

module.exports.renderEditForm = catchAsync(async function (req, res, next) {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    req.flash("error", "Cannot find Post");
    return res.redirect("/");
  }
  // console.log("testing");
  // console.log(post.image.thumbnail);
  res.render("post/edit", { post });
});

module.exports.renderPost = catchAsync(async function (req, res, next) {
  const { id } = req.params;
  const post = await Post.findById(id)
    .populate("author")
    .populate({
      path: "replies",
      populate: { path: "author", model: "User" },
    });

  if (!post) {
    req.flash("error", "Cannot find that post");
    res.redirect("/");
  }

  res.render("post/show", { post });
});

module.exports.createNewPost = catchAsync(async function (req, res, next) {
  if (!req.body.post) throw new ExpressError("Invalid Post Data", 400);

  let newPost = new Post(req.body.post);
  newPost.date = Date.now();
  newPost.author = req.user._id;
  if (req.file) {
    newPost.image = { url: req.file.path, filename: req.file.filename };
  }

  await newPost.save();
  req.flash("success", "Succesfully made a new post");
  res.redirect(`/post/${newPost._id}`);
});

module.exports.updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;

  // Get the post by id, edit and run validate
  const post = await Post.findById(id);
  if (!post.author.equals(req.user._id)) {
    req.flash("error", "Permission Denied");
    return res.redirect(`/post/${id}`);
  }

  const updateBlock = { ...req.body.post };

  //if a different image is added, edit the image
  if (req.file) {
    updateBlock["image"] = { url: req.file.path, filename: req.file.filename };
  }

  const editedPost = await Post.findByIdAndUpdate(id, updateBlock, {
    useFindAndModify: false,
    runValidators: true,
  });

  if (editedPost.image) {
    cloudinary.v2.uploader.destroy(editedPost.image.filename);
  }

  res.redirect(`/post/${editedPost._id}`);
});

module.exports.deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);
  if (deletedPost.image) {
    cloudinary.v2.uploader.destroy(deletedPost.image.filename);
  }

  req.flash("success", "successfully deleted post");
  res.redirect("/");
});
