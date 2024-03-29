const router = require("express").Router();
const { BlogPost, User } = require("../../models"); // Make sure to import User
const withAuth = require("../../utils/auth");

// Route to get a blog post by id with user data
router.get("/:id", async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new blog post
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to update an existing blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to retrieve a blog post for editing
router.get("/create/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);

    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete an existing blog post
router.delete("/:id", withAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports
module.exports = router;
