const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Thought = require("../../models/thoughts");
const { post } = require("request");

//Get All Thought
router.get("/all", (req, res) => {
  Thought.find()
    .sort({ date: -1 })
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.json({ error: err }));
});

//Get User Thought
router.get("/user", auth, (req, res) => {
  Thought.find({ address: req.address })
    .sort({ date: -1 })
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.json({ error: err }));
});

//Get Thought by ID
router.get("/:id", (req, res) => {
  post
    .findById(req.params.id)
    .then((thought) => res.json(thought))
    .catch((err) => res.json({ error: err }));
});

//Create Thought
router.post(
  "/",
  [auth, [check("content", "Content is required").not().isEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const newThought = new Thought({
      address: req.address,
      content: req.body.content,
    });

    newThought
      .save()
      .then((thought) => res.json(thought))
      .catch((err) => res.json({ error: err }));
  }
);

//Like Thought
router.put("/like/:id", auth, (req, res) => {
  Thought.findById(req.params.id)
    .then((thought) => {
      if (thought.likes.includes(req.address)) {
        thought.likes.splice(thought.likes.indexOf(req.address), 1);
      } else {
        thought.likes.push(req.address);
      }
      thought
        .save()
        .then((thought) => res.json(thought))
        .catch((err) => res.json({ error: err }));
    })
    .catch((err) => res.json({ error: err }));
});

module.exports = router;
