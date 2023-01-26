const Comment = require("../models/comment");

const fetchCommentsByPost = async (req, res) => {
    // Find the comments
    var userurl = req.params.postId;
    const comments = await Comment.find({ "postId": userurl }).sort({ date: -1 });

    // Respond with them
    res.json({ comments });
};

const fetchCommentbyUser = async (req, res) => {
    // Find the comments
    var userurl = req.params.user;
    const comments = await Comment.find({ "name": userurl }).sort({ date: -1 });

    // Respond with them
    res.json({ comments });
};

const fetchComment = async (req, res) => {
    // Get id off the url
    const CommentId = req.params.id;

    // Find the Comment using that id
    const comments = await Comment.findById(CommentId);

    // Respond with the Comment
    res.json({ comments });
};

const updateComment = async (req, res) => {
    // Get the id off the url
    const CommentId = req.params.id;

    // Get the data off the req body
    const { name, postId, body, date } = req.body;

    // Find and update the record
    await Comment.findByIdAndUpdate(CommentId, {
        name,
        postId,
        body,
        date
    });

    // Find updated Comment
    const comments = await Comment.findById(CommentId);

    // Respond with it
    res.json({ comments });
};

const deleteComment = async (req, res) => {
    // get id off url
    const CommentId = req.params.id;

    // Delete the record
    await Comment.deleteOne({ id: CommentId });
    await deleteFile(req.imageName);

    // Respond
    res.json({ success: "Record deleted" });
};

const createComment = async (req, res) => {
    // Get the sent in data off request body
    let { name, postId, body } = req.body;
    const date = Date.now();

    const comment = await Comment.create({
        name,
        postId,
        body,
        date,
    });

    // respond with the new Post
    res.json({ comment });
};

module.exports = {
    createComment,
    fetchCommentsByPost,
    fetchComment,
    fetchCommentbyUser,
    updateComment,
    deleteComment,
};

