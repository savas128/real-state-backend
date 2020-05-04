const express = require("express");

const authUser = require("../services/auth");
const { authenticateUser} = require('../middlewares/auth');

const router = express.Router();

router.post("/", authenticateUser, async (req, res) => {
  res.status(200).json(res.locals.user);
});


router.post("/logout", (req, res) => {
  res.clearCookie("jwt")
  res.status(200).end();
});

module.exports = router;
