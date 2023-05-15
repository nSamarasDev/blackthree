const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

const Article = require("../../models/Article");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  GET api/profile/me
// @desc   Get current users profile
//@access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const article = await Article.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!article) {
      return res.status(400).json({ msg: "There is no article for this user" });
    }

    res.json(article);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/articles
// @desc     Create an article
// @access   Private
router.post(
  "/",
  auth,
  body("article", "Please write your article").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newArticle = new Article({
        article: req.body.article,
        content: req.body.content,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const article = await newArticle.save();

      res.json(article);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/article
// @desc     Get all articles
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 }); // -1 is most recent date first
    res.json(articles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/article/:id
// @desc     Get article by Id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Article not found" });
    }

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    console.log(article); // add this line to log the post variable

    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }

    // Check if logged in user matches user of the post
    if (article.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await article.deleteOne();

    res.json({ msg: "Article removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Article not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/article/like/:id
// @desc     Like an article
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    // Check if this post article already been liked by this user
    if (
      article.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Article already liked" });
    }

    article.likes.unshift({ user: req.user.id });

    await article.save();

    res.json(article.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     unLike a post
// @access   Private
router.put("/unlike/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    // Check if this article has already been liked by this user
    if (
      article.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Article has not yet been liked" });
    }

    // Get remove index
    const removeIndex = article.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    article.likes.splice(removeIndex, 1);

    await article.save();

    res.json(article.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/article/comment/:id
// @desc     Create a comment for an article
// @access   Private
router.post(
  "/comment/:id",
  auth,
  checkObjectId("id"),
  body("text", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const article = await Article.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      article.comments.unshift(newComment);

      await article.save();

      res.json(article.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/article/comment/:id/:comment_id
// @desc     Delete a comment on a post.
// @desc     Delete by post id then comment id.
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // Identify the post for the comment
    const article = await Article.findById(req.params.id);

    // Fetch comment for post
    const comment = article.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = article.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    article.comments.splice(removeIndex, 1);

    await article.save();

    res.json(article.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
