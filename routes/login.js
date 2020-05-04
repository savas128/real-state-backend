const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config/index");

const loginUser = require("../services/login");


router.post("/", async function(req, res) {
  try {
    const result = await loginUser(req.body);
    if (result.isLogged === true) {
      const { user: { name, email, role, _id} } = result;
      const credentials = {
        id: _id,
        name,
        email,
        role,
        isLogged: true
      }
      const token = jwt.sign(credentials, config.jwtSecret)
      res.cookie("mdbjwt", token, { expires: new Date(Date.now() + (1000 * 60 * 5)), httpOnly: true}); // 5 minutes
      res.send(credentials)
    } else {
      res.send(result);
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
