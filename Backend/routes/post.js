const { createPost, 
    likeAndUnlikePost, 
    deletePost, 
    getPostoffollowing, 
    updateCaption, 
    commentOnPost, 
    deleteComment } = require("../controllers/post");
const express = require ("express");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/post/:id").get(isAuthenticated,likeAndUnlikePost);
router.route("/post/:id").put(isAuthenticated, updateCaption);
router.route("/post/:id").delete(isAuthenticated, deletePost);
router.route("/posts").get(isAuthenticated,getPostoffollowing);
router.route("/post/comment/:id").put(isAuthenticated,commentOnPost)
                                 .delete(isAuthenticated, deleteComment);


module.exports = router;