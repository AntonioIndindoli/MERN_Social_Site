const Post = require("../models/post");

const { uploadFile, deleteFile, getObjectSignedUrl } = require('../s3.js');
const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const fetchPosts = async (req, res) => {
  // Find the posts
  const posts = await Post.find();

  for (let post of posts) {
    if(post.imageName)
    post.imageUrl = await getObjectSignedUrl(post.imageName)
  }

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
  const imageName = generateFileName();
  let file = req.file;
  if(req.file){
      const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer()

  await uploadFile(fileBuffer, imageName, file.mimetype)

  // Create a Post with it
  const post = await Post.create({
    name,
    body,
    date,
    imageName,
  });
  }
  else{
  const post = await Post.create({
    name,
    body,
    date,
    imageName,
  });
  }



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
  await deleteFile(req.imageName);

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