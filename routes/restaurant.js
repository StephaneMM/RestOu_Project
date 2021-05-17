var express = require('express');
var router = express.Router();
const Restaurant = require("./../models/Restaurant");
const uploader = require('../configs/cloudinary.config');
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',

  // Optional depending on the providers

  apiKey: process.env.GOOGLE_API,
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('ok');
});


router.get("/new", async (req, res, next) => {
  res.render("restaurants/new");
});

router.post('/create', uploader.single('picture'), (req, res) => {
  let markers = []
  geocoder.geocode(req.body.address).then((response) => {
  const { name, address, minPrice, maxPrice, cuisineType, description, stars, standing, greenTouch, openingHours, phoneNumber, website } = req.body;
  markers.push(response[0].latitude, response[0].longitude)

  const filePath = !req.file ? undefined : req.file.path

  Restaurant.create({ name, address, minPrice, maxPrice, cuisineType, description, stars, standing, greenTouch, openingHours, phoneNumber, website, coordinates: markers, picture: filePath })
    .then((response) => {
      console.log(response)
      res.redirect('/')
    })
    .catch(error => console.log(`Error while creating a new restou: ${error}`));
});
});




module.exports = router;
