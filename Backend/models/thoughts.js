const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  evmAddress: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: [String],
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Thought", thoughtSchema);
