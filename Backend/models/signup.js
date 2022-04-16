const mongoose = require("mongoose");

function isPasswordRequired() {
  if (this.googleRegistered === true) {
    return false;
  }

  return true;
}

function isServiceProviderAccount() {
  if (this.accountType === 'ServiceProvider') {
    return true;
  }

  return false;
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

  accountType: {
    type: String,
    enum: ["User", "ServiceProvider"],
    required: true,
  },

  serviceProviderID: {
    type: String,
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
