const express = require("express");
const router = express.Router();
const signUpTemplate = require("../models/signup");
const dotenv = require("dotenv");
const {OAuth2Client} = require('google-auth-library');

dotenv.config();

const client = new OAuth2Client(process.env.CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });

  const payload = ticket.getPayload();

  if (payload['aud'] !== process.env.CLIENT_ID) {
    throw 'Token unintended for app'
  }
  return payload
}

router.post("/users/login", async (req, res) => {
  const user = await signUpTemplate.findOne({
    email: req.body.email,
    accountType: req.body.accountType
  });

  // Search for the user email in db. 
  // Either the account type does not match or email does not exists
  if (!user) {
    res.status(401).json({ email: "invalid" });
    return;
  }
  // Search if the password matches
  if (user.password != req.body.password) {
    res.status(401).json({ password: "invalid" });
    return;
  }

  res.status(200).json({ success: true, verified: user.verified, userName: user.userName, serviceProviderID: user.serviceProviderID });
});

// Google Login Page
router.post("/users/login/google", async (req, res) => {
  // Verify the identity of the request
  try {
    const payload = await verify(req.body.idToken)

    console.log('google login')
    console.log(payload)

    const googleUser = {
      email: payload['email'],
      userName: payload['given_name']
    }

    const user = await signUpTemplate.findOne({
      email: googleUser.email,
      accountType: req.body.accountType,
      googleRegistered: true,
    });

    // Search for the user email in db
    // Either the account type does not match or email does nto exists
    if (!user) {
      res.status(401).json({ email: "invalid" });
      return;
    }

    res.status(200).json({ success: true, verified: user.verified, userName: user.userName, serviceProviderID: user.serviceProviderID });
  } catch (e) {
    console.log(e)
  }
});

module.exports = router;
