const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require("dotenv");
const stallTemplate = require("../models/serviceProviderData");
const queueTemplate = require("../models/queueUser");

//const venueImages = require('./venueImage.json');

const geolib = require('geolib');
const { update } = require("../models/serviceProviderData");

dotenv.config();

// Retrive store information from BestTimeAPI
// Pull data from the BestimeAPI to the database. This endpoint is meant to be used during development only.
// Vary the query by setting queryString (String to use to search BestTimeAPI) and resultCount (Number of results to retrive where 20 <= resultCount <= 200)
router.get("/serviceProvider/update-all", async (req, res) => {
  const searchResults = await axios.post(
    "https://besttime.app/api/v1/venues/search",
    null,
    {
      params: {
        api_key_private: process.env.BESTTIME_API_KEY,
        q: req.body.queryString,
        num: req.body.resultCount,
        fast: false,
        format: "raw",
      },
    }
  );

  const venueSearchProgressURL =
    searchResults.data._links.venue_search_progress;

  let inProgress = true;
  let venueSearchFilterURL;

  while (inProgress) {
    let jobProgress = await axios.get(venueSearchProgressURL);
    console.log("checking");
    console.log(jobProgress);
    if (jobProgress.data.job_finished === true) {
      inProgress = false;
      venueSearchFilterURL = jobProgress.data._links.venue_filter_api;
    }
  }

  const response = await axios.get(venueSearchFilterURL);
  console.log(response.data.venues);

  const serviceProviders = response.data.venues.map((venue) => {
    return {
      venueAddress: venue.venue_address,
      venueID: venue.venue_id,
      location: {
        type: "Point",
        coordinates: [venue.venue_lng, venue.venue_lat],
      },
      venueName: venue.venue_name,
      venueType: venue.venue_type,
      venueRatings: venue.rating,
      numReviews: venue.reviews,
    };
  });

  await stallTemplate.collection
    .insertMany(serviceProviders, {
      ordered: false,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

// Store a stall information into our database
router.post("/serviceProvider/add-stall", async (req, res) => {
  const stall = new stallTemplate({
    venueAddress: req.body.venueAddress,
    venueID: req.body.venueID,
    location: {
      type: "Point",
      coordinates: [req.body.venueLng, req.body.venueLat],
    },
    venueName: req.body.venueName,
    venueType: req.body.venueType,
    venueRatings: req.body.rating,
    numReviews: req.body.reviews,
    venueForecast: req.body.venueForecast
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

// Retrieve all nearby stores in our database.
// Nearby stores are those within 10 minute walking distance (calculated using 5 km/hr walking speed)
router.get("/serviceProvider/find-nearest", async (req, res) => {
  console.log('here')
  const stalls = await stallTemplate.find();
  const checkingRadius = 833; // in meters

  const nearbyStalls = stalls.filter((stall) => {
    return geolib.isPointWithinRadius(
      {
        latitude: stall.location.coordinates[1],
        longitude: stall.location.coordinates[0]
      },
      {
        latitude: req.query.currentLat,
        longitude: req.query.currentLng
      },
      checkingRadius
    )
  })

  let updatedNearbyStalls;
  try {
    updatedNearbyStalls = await Promise.all(nearbyStalls.map(async (stall) => {
      const queue = await queueTemplate.find({venueID: stall.venueID})

      let multiplier = 1;
      let venueForecast;

      if (stall.venueForecast) {
        venueForecast = stall.venueForecast.find(forecast => forecast.hour === Number(req.query.hour))
      } else {
        venueForecast = {intensity_txt: 'Missing'}
      }

      if (venueForecast.intensity_txt === 'Average') {
        multiplier = 1.2
      }

      if (venueForecast.intensity_txt === 'Above Average') {
        multiplier = 1.5
      } 

      if (venueForecast.intensity_txt === 'High') {
        multiplier = 2
      }

      const queueLength = queue.length
      const waitTime = queueLength === 0 ? 0 : queueLength * 10 * multiplier

      return {...stall, queueLength: queueLength, waitTime: waitTime}
    }))
  } catch (e) {
    console.log(e)
  }

  let response = updatedNearbyStalls.map((item) => {
    return {...item._doc, queueLength: item.queueLength, waitTime: item.waitTime}
  })

  res.send(response)
});

// DEVELOPMENT ONLY: 
// Update all stalls in database with image addresses found in venueImage.json
// router.post("/serviceProvider/addImages", async (req, res) => {
//   venueImages.forEach(async (venue) => {
//     await stallTemplate.updateMany(
//       {
//         venueName: {
//           $regex: venue.venueName
//         }
//       },
//       {
//         $set: {
//           "imageAddress": venue.imageAddress
//         }
//       } 
//     ).then().catch((e) => {
//       console.log(e)
//     })
//   })
    
//   res.send('done')
// })

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

// Flush out all serviceProviders
router.post("/serviceProvider/clear", (req, res) => {
  stallTemplate
    .deleteMany({})
    .then(function () {
      res.json({ status: "success" });
    })
    .catch(function () {
      res.status(400);
    });
});

module.exports = router;
