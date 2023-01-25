// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const Post = require("./models/post");
const { uploadFile, deleteFile, getObjectSignedUrl } = require('./s3.js');
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const postsController = require("./controllers/postsController");
const { signup, signin, fetchUsers } = require('./controllers/userController');
const multer  = require('multer');
const sharp = require("sharp");
const crypto = require("crypto");
const storage = multer.memoryStorage()
const upload = multer();

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

// Routing
app.get("/users", fetchUsers);
app.get("/post", postsController.fetchPosts);
app.get("/post/:user", postsController.fetchPostbyUser);
app.get("/post/:id", postsController.fetchPost);
app.post("/post", upload.single('file'),  async (req, res) => {
  // Get the sent in data off request body
  let { name, body } = req.body;
  const date = Date.now();
  var imageName = generateFileName();
  var post;

  if(req.file){
      const fileBuffer = await sharp(req.file.buffer)
    .resize({ width: 480 })
    .toBuffer()

  await uploadFile(fileBuffer, imageName, req.file.mimetype)

  // Create a Post with it
  post = await Post.create({
    name,
    body,
    imageName,
    date,
  });
  }
  else{
    imageName = "noImage";
 post = await Post.create({
    name,
    body,
    imageName,
    date,
  });
  }
  // respond with the new Post
  res.json({ post });
});
app.put("/post/:id", postsController.updatePost);
app.delete("/post/:id", postsController.deletePost);
app.post('/signup', signup);
app.post('/signin', signin);

// Start our server
app.listen(process.env.PORT);