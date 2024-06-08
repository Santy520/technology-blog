// controllers/postController.js

const Post = require('../models/post');
const Comment = require('../models/comment');

exports.getHomePage = async (req, res) => {
  const posts = await Post.findAll();
  res.render('home', { posts });
};

exports.getDashboard = async (req, res) => {
  const userId = req.session.userId;
  const userPosts = await Post.findAll({ where: { userId } });
  res.render('dashboard', { userPosts });
};

exports.getPostDetails = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findByPk(postId, { include: Comment });
  res.render('postDetails', { post });
};

exports.addComment = async (req, res) => {
  const { postId, content } = req.body;
  const userId = req.session.userId;
  await Comment.create({ postId, userId, content });
  res.redirect(`/post/${postId}`);
};
