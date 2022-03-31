const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require("dotenv");
const stallTemplate = require("../models/serviceProviderData");

dotenv.config();

// Retrive store information from BestTimeAPI
router.get("/serviceProvider/update-all", async(req, res) => {
  const searchResults = await axios.post('https://besttime.app/api/v1/venues/search', null, {
    params: {
      'api_key_private': process.env.BESTTIME_API_KEY,
      'q': 'food and drink in Singapore',
      'num': 20,
      'fast': false,
      'format': 'raw'
    }
  });

  const venueSearchProgressURL = searchResults.data._links.venue_search_progress;
  //const venueSearchJobID = searchResults.data.job_id;

  let inProgress = true;
  
  while(inProgress) {
    let jobProgress = await axios.get(venueSearchProgressURL);
    console.log('checking')
    console.log(jobProgress)
    if (jobProgress.data.job_finished === true) {
      inProgress = false;
    }
  }

  const response = await axios.get(venueSearchProgressURL)

  const serviceProviders = response.data.venues.map((venue) => {
    return {
      venueAddress: venue.venue_address,
      venueID: venue.venue_id,
      venueLat: venue.venue_lat,
      venueLng: venue.venue_lon,
      venueName: venue.venue_name
    }
  })

  res.send(serviceProviders)

  //stallTemplate.bulkSave(serviceProviders)
})

// Store a stall information into our database
router.post("/serviceProvider/add-stall", async (req, res) => {
  const stall = new stallTemplate({
    venueAddress: req.body.venueAddress,
    venueID: req.body.venueID,
    venueLat: req.body.venueLat,
    venueLng: req.body.venueLng,
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

// Retrieve store by names
router.get("/serviceProvider/search-stall", async (req, res) => {
  const stalls = await stallTemplate
    .find(
      { venueName: { $regex: req.body.venueName, $options: "i" } },
      {
        venueName: 1,
        venueID: 1,
        venueAddress: 1,
        venueLat: 1,
        venueType: 1,
        _id: 0,
      }
    )
    .sort({ venueAddress: 1 });

  if (stalls.length === 0) {
    res.send({ isEmpty: true });
  } else {
    res.send(stalls);
  }
});

module.exports = router;