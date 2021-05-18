var express = require('express');
var router = express.Router();
const Restaurant = require("./../models/Restaurant");
const uploader = require('../configs/cloudinary.config');
const NodeGeocoder = require('node-geocoder');
const RestaurantModel = require('./../models/Restaurant');
const protectRoute = require("./../middlewares/protectRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");

const options = {
  provider: 'google',

  // Optional depending on the providers

  apiKey: process.env.GOOGLE_API,
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);


/* GET users listing. */
router.get('/', function (req, res, next) {
  RestaurantModel.find()
  .then((dbResult) => 
  res.render("index.hbs",{restaurant:dbResult}))
});


router.get("/new",protectAdminRoute, async (req, res, next) => {
  res.render("restaurants/new");
});

router.post('/create',protectAdminRoute, uploader.single('picture'), (req, res) => {
  let markers = []
  let department = ""
  geocoder.geocode(req.body.address).then((response) => {

  const { name, address, minPrice, maxPrice, cuisineType, description, stars, standing, greenTouch, openingHours, phoneNumber, website } = req.body;
  markers.push(response[0].latitude, response[0].longitude)
  department = response[0].administrativeLevels.level1long
  const filePath = !req.file ? undefined : req.file.path

  Restaurant.create({ name, address, minPrice, maxPrice, cuisineType, description, stars, standing, greenTouch, openingHours, phoneNumber, website, coordinates: markers, department, picture: filePath })
    .then((response) => {
      console.log(response)
      res.redirect('/')
    })
    .catch(error => console.log(`Error while creating a new restou: ${error}`));
});
});




module.exports = router;
