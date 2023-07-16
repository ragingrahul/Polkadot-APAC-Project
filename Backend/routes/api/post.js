const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Post = require("../../models/posts");

//Get All Post
router.get("/all", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.json({ error: err }));
});

//Get User Post
router.get("/user", auth, (req, res) => {
  Post.find({ address: req.address })
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.json({ error: err }));
});

//Get User Post by EVM Address
router.get("/user/:address", (req, res) => {
  Post.find({ evmAddress: req.params.address })
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.json({ error: err }));
});

//Get Post by ID
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.json({ error: err }));
});

//Create Post
router.post(
  "/",
  [
    auth,
    [
      check("evmAddress", "EVM Address is required").not().isEmpty(),
      check("title", "Title is required").not().isEmpty(),
      check("cover", "Cover is required").not().isEmpty(),
      check("content", "Content is required").not().isEmpty(),
      check("web", "Web is required").not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const newPost = new Post({
      address: req.address,
      evmAddress: req.body.evmAddress,
      title: req.body.title,
      cover: req.body.cover,
      content: req.body.content,
      web: req.body.web,
      chain: req.body.chain,
    });

    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) => res.json({ error: err }));
  }
);

//Like Post
router.put("/like/:id", auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post.likes.includes(req.address)) {
        post.likes.splice(post.likes.indexOf(req.address), 1);
      } else {
        post.likes.push(req.address);
      }
      post
        .save()
        .then((post) => res.json(post))
        .catch((err) => res.json({ error: err }));
    })
    .catch((err) => res.json({ error: err }));
});

module.exports = router;
