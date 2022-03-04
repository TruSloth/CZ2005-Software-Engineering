const mongoose = require("mongoose");

const signUpTemplate = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  verified: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("accountTable", signUpTemplate);
