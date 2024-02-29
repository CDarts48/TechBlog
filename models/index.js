// Imports
const User = require("./Users");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");
const sessions = require("./session.js");

// Sets up relationships between tables using Sequelize associations
User.hasMany(BlogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "blogPost_id",
  onDelete: "CASCADE",
});

BlogPost.hasMany(Comment, {
  foreignKey: "blogPost_id",
  onDelete: "CASCADE",
});

// Export modules
module.exports = {
  User,
  BlogPost,
  Comment,
  sessions,
};
