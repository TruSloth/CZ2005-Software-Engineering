const { response } = require("express");
const express = require("express");
const router = express.Router();
const signUpTemplate = require("../models/signup");

router.post("/users/register", async (req, res) => {
  if (req.body.password != req.body.confirmationPassword) {
    console.log("Wrong password");
    return;
  }

  const newUser = new signUpTemplate({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    verified: false,
  });

  await newUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/users/register/:id", async (req, res) => {
  console.log(req.params.id);
  const user = await signUpTemplate.findOne({
    userName: req.params.id,
  });

  if (req.body.authid == process.env.AUTHENTICATION_TOKEN) {
    user.verified = true;
    user.save();
    res.status(200).json("Account verified");
  } else {
    res.status(401).json("Wrong Token");
  }
});

router.post("/users/login", async (req, res) => {
  const user = await signUpTemplate.findOne({
    userName: req.body.userName,
  });

  if (!user) {
    res.status(401).json("Wrong Credentials");
    return;
  }

  if (user.password != req.body.password) {
    res.status(401).json("Wrong Password");
    return;
  }

  res.status(200).json(user);
});

module.exports = router;
