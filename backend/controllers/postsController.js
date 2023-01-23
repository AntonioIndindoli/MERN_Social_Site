const Post = require("../models/post");

const fetchPosts = async (req, res) => {
  // Find the posts
  const posts = await Post.find();

  // Respond with them
  res.json({ posts });
};

const fetchPost = async (req, res) => {
  // Get id off the url
  const PostId = req.params.id;

  // Find the Post using that id
  const posts = await Post.findById(PostId);

  // Respond with the Post
  res.json({ posts });
};

const createPost = async (req, res) => {
  // Get the sent in data off request body
  let { name, body } = req.body;
  const date = Date.now();

  // Create a Post with it
  const post = await Post.create({
    name,
    body,
    date
  });

  // respond with the new Post
  res.json({ post });
};

const updatePost = async (req, res) => {
  // Get the id off the url
  const PostId = req.params.id;

  // Get the data off the req body
  const { name, body, date } = req.body;

  // Find and update the record
  await Post.findByIdAndUpdate(PostId, {
    name,
    body, 
    date
  });

  // Find updated Post
  const posts = await Post.findById(PostId);

  // Respond with it
  res.json({ posts });
};

const deletePost = async (req, res) => {
  // get id off url
  const PostId = req.params.id;

  // Delete the record
  await Post.deleteOne({ id: PostId });

  // Respond
  res.json({ success: "Record deleted" });
};

module.exports = {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
};