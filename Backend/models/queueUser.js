const mongoose = require("mongoose");

const queueTemplate = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },

  store: {
    type: String,
    required: true,
  },

  queueNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("job-queue", queueTemplate);