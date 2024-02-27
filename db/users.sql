CREATE DATABASE IF NOT EXISTS users_db;
USE users_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);
CREATE TABLE blogs (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post TEXT NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE comments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    blog_id INT NOT NULL,
    comment TEXT NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (blog_id) REFERENCES blogs(id)
);
CREATE TABLE sessions (
  sid VARCHAR(255) PRIMARY KEY,
  expires TIMESTAMP,
  data TEXT,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);