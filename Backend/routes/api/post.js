const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const { ethers, JsonRpcProvider } = require("ethers");

const Post = require("../../models/posts");
const User = require("../../models/users");

const dotComPostAddress = "0x0C3b0343e8f42063dFDf8a6F046A594D0283b730";
let ABI = [
  "function _tokenIds() public view returns(uint256)",
  "function tokenURI(uint256) public view returns(string)",
];

//Get web3 Post
router.get("/web3/all", async (req, res) => {
  try {
    const provider = new JsonRpcProvider(
      "https://rpc.api.moonbase.moonbeam.network"
    );
    const contract = new ethers.Contract(dotComPostAddress, ABI, provider);
    const tokenId = await contract._tokenIds();
    const URIs = [];
    for (i = 1; i <= tokenId; i++) {
      const metaDataLink = await contract.tokenURI(tokenId);
      URIs.push(metaDataLink);
    }
    const web3Posts = URIs;
    res.json(web3Posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//Get web2 posts
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
    .then((post) => {
      const user = User.findOne({ evmAddress: post.evmAddress });
      if (user) {
        user.views += 1;
        user.save();
      }
      res.json(post);
    })
    .catch((err) => res.json({ error: err }));
});

router.get("/web3/:id", async (req, res) => {
  try {
    const provider = new JsonRpcProvider(
      "https://rpc.api.moonbase.moonbeam.network"
    );
    const contract = new ethers.Contract(dotComPostAddress, ABI, provider);
    const metaDataLink = await contract.tokenURI(req.params.id);
    const web3Post = metaDataLink;
    res.json(web3Post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
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
      check("type", "Type is required").not().isEmpty(),
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
      type: req.body.type,
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
