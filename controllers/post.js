const Post = require("../models/post");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/expressError");
const cloudinary = require("cloudinary");
const dateTime = require("./dateTime");

module.exports.index = catchAsync(async function (req, res, next) {
  try {
    const posts = await Post.find({}).populate("author");
    res.render("index", { posts });
  } catch (e) {
    console.log("index error", e);
  }
});

module.exports.filterPosts = catchAsync(async function (req, res, next) {
  if (!req.body.neighbourhoods) {
    return res.redirect("/");
  }

  const posts = await Post.find({
    neighbourhood: { $in: req.body.neighbourhoods },
  }).populate("author");

  res.render("index", {
    posts,
    checkedNbs: req.body.neighbourhoods,
    checkedDistricts: req.body.districts,
  });
});

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

  console.log(req.body);
  let newPost = new Post({
    ...req.body.post,
    date: Date.now(),
    author: req.user._id,
  });
  // newPost.date = Date.now();
  // newPost.author = req.user._id;
  // newPost.district = districtSelect;
  // newPost.neighbourhood = neighourhoodSelect;

  if (req.file) {
    newPost.image = { url: req.file.path, filename: req.file.filename };
  }

  await newPost.save();
  console.log(newPost);
  req.flash("success", "Post Creado");
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

  req.flash("success", "Post Borrado");
  res.redirect("/");
});

module.exports.updateLikes = catchAsync(async (req, res) => {
  console.log(req.body);
  try {
    if (!req.user) {
      return res.status(403).send("Debe iniciar sesión primero");
    }

    const postID = req.body.post_id;

    //see if post has been liked
    const likedPost = await Post.find({
      _id: postID,
      likedByUsers: { $in: [req.user._id] },
    }).lean();

    //see if post has been disliked
    const dislikedPost = await Post.find({
      _id: postID,
      dislikedByUsers: { $in: [req.user._id] },
    }).lean();

    if (
      Object.keys(likedPost).length > 1 ||
      Object.keys(dislikedPost).length > 1
    ) {
      console.log("user has liked / disliked this post more than once");
    }

    if (
      Object.keys(likedPost).length === 0 &&
      Object.keys(dislikedPost).length === 0
    ) {
      console.log("hasn't been liked");
      if (req.body.vote == 1) {
        const updatePost = await Post.findByIdAndUpdate(
          postID,
          { likes: req.body.likes, $push: { likedByUsers: req.user._id } },
          {
            useFindAndModify: false,
            runValidators: true,
          }
        );
      } else if (req.body.vote == -1) {
        const updatePost = await Post.findByIdAndUpdate(
          postID,
          { likes: req.body.likes, $push: { dislikedByUsers: req.user._id } },
          {
            useFindAndModify: false,
            runValidators: true,
          }
        );
      }
    }
    //post is already liked
    else if (Object.keys(likedPost).length >= 1) {
      if (parseInt(req.body.vote) === 1) {
        return res.status(403).send("Ya has dado like a este post");
      }
      const updatePost = await Post.findByIdAndUpdate(
        postID,
        {
          likes: req.body.likes,
          $pull: { likedByUsers: req.user._id },
        },
        {
          useFindAndModify: false,
          runValidators: true,
        }
      );
      //post is already disliked
    } else if (Object.keys(dislikedPost).length >= 1) {
      if (parseInt(req.body.vote) === -1) {
        return res.status(403).send("Ya has dado dislike a este post");
      }
      const updatePost = await Post.findByIdAndUpdate(
        postID,
        {
          likes: req.body.likes,
          $pull: { dislikedByUsers: req.user._id },
        },
        {
          useFindAndModify: false,
          runValidators: true,
        }
      );
    }

    return res.status(200).send("Success");
  } catch (e) {
    console.log("update likes error", e);
  }
});
