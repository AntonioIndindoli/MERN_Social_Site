const Post = require("../models/post");

const { uploadFile, deleteFile, getObjectSignedUrl } = require('../s3.js');
const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");
const upload = multer({ dest: 'uploads/' })

const fetchPosts = async (req, res) => {
  // Find the posts
  const posts = await Post.find().sort({date:-1});

  for (let post of posts) {
    if(post.imageName != 'noImage')
    post.imageName = await getObjectSignedUrl(post.imageName)
  }

  // Respond with them
  res.json({ posts });
};

const fetchPostbyUser = async (req, res) => {
  // Find the posts
  var userurl = req.params.user;
  const posts = await Post.find({ "name": userurl }).sort({date:-1});

  for (let post of posts) {
    if(post.imageName != 'noImage')
    post.imageName = await getObjectSignedUrl(post.imageName)
  }

  // Respond with them
  res.json({ posts });
};

const fetchPost = async (req, res) => {
  // Get id off the url
  const PostId = req.params.id;

  // Find the Post using that id
  const posts = await Post.findById(PostId);

  for (let post of posts) {
    if(post.imageName != 'noImage')
    post.imageName = await getObjectSignedUrl(post.imageName)
  }

  // Respond with the Post
  res.json({ posts });
};

const likePost = async (req, res) => {
  const PostId = req.params.id;
  Post.findByIdAndUpdate(PostId, {
    $push: {likes: req.params.name}
  }, {new: true}).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err})
    } else {
      return res.json(result)
    }
  })
}

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
  await deleteFile(req.imageName);

  // Respond
  res.json({ success: "Record deleted" });
};

module.exports = {
  fetchPosts,
  fetchPost,
  likePost,
  fetchPostbyUser,
  updatePost,
  deletePost,
};