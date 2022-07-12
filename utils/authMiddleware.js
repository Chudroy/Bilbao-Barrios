const Post = require("../models/post");
// when adding JOI authentication, here to have to include the express error util
//from the Utils folder

// authentication
const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    req.session.returnTo = req.originalUrl;
    req.session.savedBody = req.body;
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  next();
};

// authorization
const isAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post.author.equals(req.user._id)) {
      req.flash("error", "Permission Denied");
      return res.redirect(`/post/${id}`);
    }
    next();
  } catch (e) {
    console.log("error");
    console.log(e);
  }
};

module.exports = { isLoggedIn, isAuthor };
