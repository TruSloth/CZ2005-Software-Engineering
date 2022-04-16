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
    unique: true
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },

  venueLat: {
    type: Decimal128,
    required: true,
  },

  venueLng: {
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

  venueRatings: {
    type: Decimal128,
    default: 0
  },

  numReviews: {
    type: Number,
    default: 0
  },

  imageAddress: {
    type: String,
  },
  
  venueForecast: {
    type: [{
      'hour': {type: Number}, 
      'intensity_txt': {type: String}, 
      'intensity_nr': {type: String}}
    ],
  }
});

module.exports = mongoose.model("stall-information", serviceProviderData);