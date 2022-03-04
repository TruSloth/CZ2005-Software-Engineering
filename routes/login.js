const express = require("express");
const router = express.Router();
const signUpTemplate = require("../models/signup");

router.post("/users/login", async (req, res) => {
  const user = await signUpTemplate.findOne({
    email: req.body.email,
  });

  // Search for the user email in db
  if (!user) {
    res.status(401).json({ email: "invalid" });
    return;
  }
  // Search if the password matches
  if (user.password != req.body.password) {
    res.status(401).json({ password: "invalid" });
    return;
  }

  res.status(200).json({ success: true, verified: user.verified });
});

module.exports = router;
