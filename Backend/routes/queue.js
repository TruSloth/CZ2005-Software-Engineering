const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const queueTemplate = require("../models/queueUser");
const signUpTemplate = require("../models/signup");
const stallTemplate = require("../models/serviceProviderData");

dotenv.config();

  async function determineQueueNumber(data) {
    const previousHighest = await queueTemplate
      .find({
        venueID: data.store,
      })
      .findOne()
      .sort({ queueNumber: -1 });
  
    if (previousHighest === null) {
      return 0;
    }
    return previousHighest.queueNumber;
  }
  
  // End user to join the queue
  router.post("/join-queue", async (req, res) => {
    const previousHighest = await determineQueueNumber(req.body);
  
    const newEntry = new queueTemplate({
      user: req.body.user,
      venueID: req.body.store,
      queueNumber: previousHighest + 1,
      pax: req.body.pax
    });
  
    await newEntry
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log(error)
      });
  });
  
  router.post("/leave-queue", async (req, res) => {
    const leaveQueue = await queueTemplate.findOneAndDelete(
      {
        venueID: req.body.venueID,
        user: req.body.userName
      },
      { sort: { queueNumber: 1 } }
    );
    
    if (leaveQueue === null) {
      res.json({Error: "User not found in any queue"});
    } else {
      res.json(leaveQueue)
    }
  })
  
  // To empty the queue of a certain store
  router.post("/empty-queue", (req, res) => {
    queueTemplate
      .deleteMany({ store: req.body.store })
      .then(function () {
        res.json({ status: "success" });
      })
      .catch(function () {
        res.status(400);
      });
  });
  
  // Service provider to get the next person
  router.post("/push-queue", async (req, res) => {
    const nextTurn = await queueTemplate.findOneAndDelete(
      {
        venueID: req.body.venueID,
        user: req.body.userName
      },
      { sort: { queueNumber: 1 } }
    );

    if (nextTurn === null) {
      res.json({ Error: "No users in queue" });
    } else {
      const sockets = await req.io.fetchSockets();

      const socket = sockets.find((socket) => socket.data.userName === req.body.userName)

      if (socket) {
        socket.emit('queue-reached')
      } else {
        console.log('Socket not found. User not connected')
      }

      res.json(nextTurn);
    }
  });
  
  // Display queue of a certain store
  router.get("/view-queue", async (req, res) => {
    const storeQueue = await queueTemplate
      .find({ venueID: req.query.venueID }, { queueNumber: 1, user: 1, pax: 1, _id: 0 })
      .sort({ queueNumber: 1 });
  
    if (storeQueue.length === 0) {
      res.send([]);
    } else {
      res.send(storeQueue);
    }
  });
  
  router.get("/view-queueTimes", async (req, res) => {
    const storeQueue = await queueTemplate
      .find({ venueID: req.query.venueID }, { queueNumber: 1, user: 1, _id: 0 })
      .sort({ queueNumber: 1 });
  
      console.log(storeQueue)
  
    const intensity = await stallTemplate
      .findOne({venueID: req.query.venueID}, {venueForecast: {hour: req.query.hour}})
  
    let multiplier = 1
  
    const venueForecast = intensity.venueForecast ?? {intensity_txt: 'Missing'} 
  
    if (venueForecast.intensity_txt === 'Average') {
      multiplier = 1.2
    }
  
    if (venueForecast.intensity_txt === 'Above Average') {
      multiplier = 1.5
    } 
  
    if (venueForecast.intensity_txt === 'High') {
      multiplier = 2
    }
  
    // if(intensity.venueForecast.intensity_txt == 'low' || intensity.venueForecast.intensity_txt == 'Below Average'){
    //   multiplier = 1
    // }else if(intensity.venueForecast.intensity_txt == 'Average'){
    //   multiplier = 1.2
    // }else if(intensity.venueForecast.intensity_txt == 'Above Averge'){
    //   multiplier = 1.5
    // }else if(intensity.venueForecast.intensity_txt == "High"){
    //   multiplier = 2
    // }
  
    if (storeQueue.length === 0) {
      res.send({waitTime: storeQueue.length});
    } else {
      res.send({waitTime: storeQueue.length * 10 * multiplier});
    }
  });
  
  // router.post("/leave-queue", (req, res) => {
  //   var name = null;
  //   var ackId = null;
  
  //   queue.get({ visibility: 5 }, (err, msg) => {
  //     console.log(msg.payload);
  //     name = msg.payload.name;
  //     ackId = msg.payload.ack;
  //     queue.ack(ackId, (err, id) => {
  //       console.log("Removed from the queue");
  //     });
  //   });
  //   res.json(ackId);
  // });


module.exports = router;
