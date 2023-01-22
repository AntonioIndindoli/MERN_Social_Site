const Post = require("../models/post");

const fetchPosts = async (req, res) => {
  // Find the Posts
  const Posts = await Post.find();

  // Respond with them
  res.json({ Posts });
};

const fetchPost = async (req, res) => {
  // Get id off the url
  const PostId = req.params.id;

  // Find the Post using that id
  const Post = await Post.findById(PostId);

  // Respond with the Post
  res.json({ Post });
};

const createPost = async (req, res) => {
  // Get the sent in data off request body
  const { body} = req.body;
  const { author } = req.author;
  const { date } = req.date;

  // Create a Post with it
  const Post = await Post.create({
    author,
    body,
    date,
  });

  // respond with the new Post
  res.json({ Post });
};

const updatePost = async (req, res) => {
  // Get the id off the url
  const PostId = req.params.id;

  // Get the data off the req body
  const { author, body, date } = req.body;

  // Find and update the record
  await Post.findByIdAndUpdate(PostId, {
    author,
    body, 
    date
  });

  // Find updated Post
  const Post = await Post.findById(PostId);

  // Respond with it
  res.json({ Post });
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