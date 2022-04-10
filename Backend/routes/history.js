const express = require("express");
const router = express.Router();
const userHistTemplate = require("../models/userHistory");
const stallTemplate = require("../models/serviceProviderData");
const { spawn } = require("child_process");

router.post("/users/history", async (req, res) => {
  const historicalData = new userHistTemplate({
    user: req.body.user,
    venueID: req.body.venueID,
    time: req.body.time,
  });

  await historicalData
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/users/gethistory", async (req, res) => {
  const history = await userHistTemplate
    .find(
      {
        user: req.body.user,
      },
      { venueID: 1, time: 1, _id: 0 }
    )
    .sort({ createdAt: 1 });

  res.send(history);
});

router.get("/users/history/recommender", async (req, res) => {
  const history = await userHistTemplate.find(
    {
      user: req.body.user,
    },
    { venueID: 1, _id: 0 }
  );
  res.send(history);
});

module.exports = router;