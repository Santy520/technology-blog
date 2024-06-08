// models/post.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Post;
