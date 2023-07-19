const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  evmAddress: {
    type: String,
    required: true,
  },
  following: [String],
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
