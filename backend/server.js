// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const postsController = require("./controllers/postsController");
const { signup, signin, fetchUsers } = require('./controllers/userController');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();

// Routing
app.get("/users", fetchUsers);
app.get("/post", postsController.fetchPosts);
app.get("/post/:id", postsController.fetchPost);
app.post("/post", upload.single('image'), postsController.createPost);
app.put("/post/:id", postsController.updatePost);
app.delete("/post/:id", postsController.deletePost);
app.post('/signup', signup);
app.post('/signin', signin);

// Start our server
app.listen(process.env.PORT);