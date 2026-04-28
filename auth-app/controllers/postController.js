const Post = require("../models/Post");

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = new Post({
      title,
      content,
      author: req.user.id
    });

    await post.save();

    res.json(post);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// GET ALL POSTS (with user name)
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email");

    res.json(posts);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// DELETE POST (only owner)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // security check
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await post.deleteOne();

    res.json({ msg: "Post deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};