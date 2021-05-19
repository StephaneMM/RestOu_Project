var express = require("express");
var router = express.Router();
const Restaurant = require("./../models/Restaurant");
const uploader = require("../configs/cloudinary.config");
const NodeGeocoder = require("node-geocoder");
const RestaurantModel = require("./../models/Restaurant");
const protectRoute = require("./../middlewares/protectRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");
const ReviewModel = require("./../models/Review");

const options = {
  provider: "google",

  // Optional depending on the providers

  apiKey: process.env.GOOGLE_API,
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

router.get("/", function (req, res, next) {
  if (!req.query.resName) {
    RestaurantModel.find().then((dbResult) =>
      res.render("index.hbs", { restaurant: dbResult })
    );
  } else {
    Restaurant.find({ department: req.query.resName }).then((dbResult) =>
      res.render("index.hbs", { restaurant: dbResult })
    );
  }
});

router.get("/new", protectAdminRoute, async (req, res, next) => {
  res.render("restaurants/new");
});

router.post(
  "/create",
  protectAdminRoute,
  uploader.single("picture"),
  (req, res) => {
    let markers = [];
    geocoder.geocode(req.body.address).then((response) => {
      const {
        name,
        address,
        minPrice,
        maxPrice,
        cuisineType,
        description,
        stars,
        standing,
        greenTouch,
        openingHours,
        phoneNumber,
        website,
      } = req.body;
      markers.push(response[0].latitude, response[0].longitude);
      let department = response[0].administrativeLevels.level1long;
      const filePath = !req.file ? undefined : req.file.path;

      Restaurant.create({
        name,
        address,
        minPrice,
        maxPrice,
        cuisineType,
        description,
        stars,
        standing,
        greenTouch,
        openingHours,
        phoneNumber,
        website,
        coordinates: markers,
        department,
        picture: filePath,
      })
        .then((response) => {
          console.log(response);
          res.redirect("/");
        })
        .catch((error) =>
          console.log(`Error while creating a new restou: ${error}`)
        );
    });
  }
);

router.get("/:id", (req, res, next) => {
  RestaurantModel.findById(req.params.id)
    .then((restaurant) => {
      ReviewModel.find({ restaurantId: req.params.id })
      .then((review) => {
        review.populate("userId")
        .then(() => res.render("restauPage", { restaurant: restaurant, reviews: reviews }))
      });
    })
    .catch((dbErr) => {
      next(dbErr);
    });
});

module.exports = router;
