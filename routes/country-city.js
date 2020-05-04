const express = require("express");
const router = express.Router();

const { getCountries, getCities } = require("../services/country-city");

router.get("/", async function(req, res) {
  try {
    const countries = await getCountries();
    res.send(countries);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id/cities", async function(req, res) {
  try {
    const cities = await getCities(req.params.id);
    console.log(cities)
    res.send(cities);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
