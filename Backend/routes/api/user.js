const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { ethers, JsonRpcProvider } = require("ethers");

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

module.exports = router;
