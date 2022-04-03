const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const queueTemplate = require("../models/queueUser");
const signUpTemplate = require("../models/signup");

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
      store: req.body.store,
    },
    { sort: { queueNumber: 1 } }
  );

  if (nextTurn === null) {
    res.json({ Error: "No users in queue" });
  } else {
    res.json(nextTurn);
  }
});

// Display queue of a certain store
router.get("/view-queue", async (req, res) => {
  const storeQueue = await queueTemplate
    .find({ store: req.body.store }, { queueNumber: 1, user: 1, _id: 0 })
    .sort({ queueNumber: 1 });

  if (storeQueue.length === 0) {
    res.send({ isEmpty: true });
  } else {
    res.send(storeQueue);
  }
});

// mongoose.createConnection(process.env.DATABASE_ACCESS, () => {
//   console.log("Database queue is connected");
// });

// const db = mongoose.connection;
// var queue = mongodbQueue(db, "job-queue");

// queue.createIndexes((err, indexName) => {});

// queue.clean((err) => {});

// router.post("/join-queue", (req, res) => {
//   const data = {
//     name: req.body.name,
//     pax: req.body.pax,
//   };

//   queue.add([data], (err, id) => {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     res.json(id);
//   });
// });

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
