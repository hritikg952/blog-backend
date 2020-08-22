const Post = require("../model/post");
const User = require("../model/user");
//?PARAM route
exports.getPostById = (req, res, next, id) => {
  Post.findById(id).exec((err, post) => {
    if (err) {
      res.status(400).json({
        error: "Post does not exist",
      });
    }
    req.post = post;
    next();
  });
};

//? CREATE post route
exports.createPost = (req, res, next) => {
  req.body.author = req.profile;
  const post = new Post(req.body);
  post.save((err, post) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save post in DB",
      });
    }
    return res.json({
      title: post.title,
      content: post.content,
      _id: post._id,
      author: post.author.name,
    });
  });
  // next();
};

//?READ routes
exports.getPost = (req, res) => {
  return res.json(req.post);
};

exports.getAllPost = (req, res) => {
  Post.find()
    .populate("author")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({
          error: "no Post in DB",
        });
      }
      return res.json(post);
    });
};

//?UPDATE route

exports.updatePost = (req, res, id) => {
  Post.findByIdAndUpdate(
    { _id: req.post._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, post) => {
      if (err) {
        return res.status(400).json({
          error: "Post does not exist in DB",
        });
      }
      return res.json(post);
    }
  );
};

//?DELETE post
exports.deletePost = (req, res) => {
  const post = req.post;

  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete post`,
      });
    }
    res.json({
      message: `Successfully deleted`,
    });
  });
};
