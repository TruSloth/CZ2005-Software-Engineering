const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const serviceProviderData = new mongoose.Schema({
  venueAddress: {
    type: String,
    required: true,
  },

  venueID: {
    type: String,
    required: true,
  },

  venueLat: {
    type: Decimal128,
    required: true,
  },

  venueName: {
    type: String,
    required: true,
  },

  venueType: {
    type: String,
    required: true,
  },

  imageAddress: {
    type: String,
  },
});

module.exports = mongoose.model("stall-information", serviceProviderData);