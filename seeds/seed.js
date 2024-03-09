const sequelize = require("../config/connection");
const { User, Blog, Comment, BlogPost } = require("../models");

const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");

// Seeds database with user data, blog data, and comment data
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await BlogPost.bulkCreate(blogData);

  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
