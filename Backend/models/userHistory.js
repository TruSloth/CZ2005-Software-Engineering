const mongoose = require("mongoose");

const userHistory = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },

  venueID: {
    type: String,
    required: true,
  },

  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user-history", userHistory);