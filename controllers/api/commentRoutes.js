// Imports
const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.session.user_id) {
    next();
  } else {
    res.status(403).json({ message: "You must be logged in to do that." });
  }
}

// CREATE Comment
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const comment = await Comment.create({
      comment: req.body.comment_body,
      blog_id: req.body.blogPost_id,
      user_id: req.session.user_id,
    });

    // Return the comment and user data
    const user = await User.findByPk(req.session.user_id);
    res.json({
      comment_body: comment.comment,
      date_created: comment.createdAt,
      user: {
        name: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
// READ all Comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: BlogPost,
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE Comment
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedComment[0]) {
      res.status(400).json({ message: "No comment found with that id!" });
      return;
    }

    console.log("Comment updated!");
    res.status(200).json(updatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE Comment
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!comment) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ a single BlogPost with its Comments and User data
router.get("/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Exports
module.exports = router;
