const express = require("express");
const router = express.Router();
const stallTemplate = require("../models/stallData");

// Store a stall information into our database
router.post("/serviceProvider/add-stall", async (req, res) => {
  const stall = new stallTemplate({
    venueAddress: req.body.venueAddress,
    venueID: req.body.venueID,
    venueLat: req.body.venueLat,
    venueName: req.body.venueName,
    venueType: req.body.venueType,
  });

  await stall
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Retrieve all the stores in our database
router.get("/serviceProvider/get-stall", async (req, res) => {
  const stalls = await stallTemplate.find();
  res.send(stalls);
});

module.exports = router;