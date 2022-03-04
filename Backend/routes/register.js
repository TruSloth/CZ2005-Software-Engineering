const express = require("express");
const isEmpty = require("is-empty");
const sendMail = require("../tools/nodemailer");
const router = express.Router();
const signUpTemplate = require("../models/signup");

async function validateLoginInput(data) {
  let errors = {};
  // Check the password and confirmed password are equal
  if (data.password != data.confirmationPassword) {
    errors.password = "Password Mismatch";
  }
  // Check if the email already exists
  if (
    await signUpTemplate.findOne({
      email: data.email,
    })
  ) {
    errors.email = "Email already exists";
  }
  // Check if the username already exists
  if (
    await signUpTemplate.findOne({
      userName: data.userName,
    })
  ) {
    errors.userName = "Username already exists";
  }

  return { errors, isValid: isEmpty(errors) };
}

router.post("/users/register", async (req, res) => {
  // Ensure the input meets our requirements
  const { errors, isValid } = await validateLoginInput(req.body);
  if (!isValid) {
    res.status(401).json(errors);
    return;
  }
  // Creating a new user
  const newUser = new signUpTemplate({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    verified: false,
  });

  sendMail(
    req.body.email,
    "Authentication Token",
    process.env.AUTHENTICATION_TOKEN
  );

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
  // Retrieving the user id
  const user = await signUpTemplate.findOne({
    userName: req.params.id,
  });

  if (!user) {
    res.status(401).json({ userName: "Invalid" });
  }

  if (req.body.authid === process.env.AUTHENTICATION_TOKEN) {
    user.verified = true;
    user.save();
    res.status(200).json({ verified: "Account verified" });
    return;
  } else {
    res.status(401).json({ token: "Invalid Token" });
    return;
  }
});

router.get("/users/register", (req, res) => {
  res.render();
});

module.exports = router;
