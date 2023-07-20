const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { ethers, JsonRpcProvider } = require("ethers");

const User = require("../../models/users");

const dotComAddress = "0x444a911808D18E17Bf4D7eB44Aa4dee09c605248";
let ABI = [
  "function addressToId(address) public view returns (uint256)",
  "function idToUser(uint256) public view returns (uint256,string,address,string,string,uint256)",
];

router.get("/evm/:address", async (req, res) => {
  try {
    const provider = new JsonRpcProvider(
      "https://rpc.api.moonbase.moonbeam.network"
    );
    const contract = new ethers.Contract(dotComAddress, ABI, provider);
    const id = await contract.addressToId(req.params.address);
    const user = await contract.idToUser(id);
    res.json(
      JSON.parse(
        JSON.stringify(user, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      )
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/evm/:address/followers", async (req, res) => {
  try {
    User.find({ following: req.params.address }, (err, users) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      } else {
        res.json(users);
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/evm/:address/following", async (req, res) => {
  try {
    User.findOne({ evmAddress: req.params.address }, (err, user) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      } else {
        res.json(user.following);
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/evm/:address/views", async (req, res) => {
  try {
    User.findOne({ evmAddress: req.params.address }, (err, user) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      } else {
        res.json(user.views);
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/evm/:address/follow", auth, async (req, res) => {
  try {
    const user = await User.findOne({ evmAddress: req.params.address });
    const reqUser = await User.findOne({ address: req.address });
    if (user.following.includes(reqUser.evmAddress)) {
      res.status(400).json({ msg: "User already followed" });
    } else {
      user.following.push(reqUser.evmAddress);
      await user.save();
      res.json(user.following);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/evm/:address/unfollow", auth, async (req, res) => {
  try {
    const user = await User.findOne({ evmAddress: req.params.address });
    const reqUser = await User.findOne({ address: req.address });
    if (!user.following.includes(reqUser.evmAddress)) {
      res.status(400).json({ msg: "User not followed" });
    } else {
      user.following.splice(user.following.indexOf(reqUser.evmAddress), 1);
      await user.save();
      res.json(user.following);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
