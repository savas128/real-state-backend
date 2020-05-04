const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/apartments/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage });
// const api = require('../db/api/apartments');

const { getApartments, getApartmentById } = require("../services/apartments");
const { authenticateUser } = require("../middlewares/auth");
const Apartment = require('../models/apartment');

router.get("/", async function (req, res, next) {
  try {
    const apartments = await getApartments(req.query);
    res.send(apartments);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const apartment = await getApartmentById(req.params.id);
    res.send(apartment);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", authenticateUser, upload.array("images", 5), async function (req, res) {
  try {
    console.log(req.body);
    const images = [];
    req.files.forEach((img) => {
      images.push(img.path.replace("public", ""));
    });
    req.body.images = images;
    const apartment = await addApartment(req.body);
    res.status(200).send(apartment);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
