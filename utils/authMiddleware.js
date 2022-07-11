// when adding JOI authentication, here to have to include the express error util
//from the Utils folder

// authentication
const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  next();
};

// authorization
const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post.author.equals(req.user._id)) {
    req.flash("error", "Permission Denied");
    return res.redirect(`/post/${id}`);
  }
  next();
};

module.exports = { isLoggedIn, isAuthor };
