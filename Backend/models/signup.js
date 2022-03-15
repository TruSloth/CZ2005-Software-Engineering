const mongoose = require("mongoose");

function isPasswordRequired() {
  if (this.googleRegistered === true) {
    return false;
  }
  
  return true;
}

const signUpTemplate = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  googleRegistered: {
    type: Boolean,
    required: true,
  },

  password: {
    type: String,
    required: isPasswordRequired, 
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
