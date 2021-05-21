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


router.get('/', function(req, res, next) {

  
  if(!req.query.resName) {

    RestaurantModel.find()
    .then((dbResult) => 
    res.render("index.hbs",{ 
      restaurant:dbResult, 
      user_id: req.session.currentUser === undefined ? null : req.session.currentUser._id,
      favoris: req.session.currentUser === undefined ? null : req.session.currentUser.favoris }))

  }  else {

    Restaurant.find({department: req.query.resName}).then((dbResult) => 
    res.render("index.hbs",{
      restaurant:dbResult, 
      user_id: req.session.currentUser === undefined ? null : req.session.currentUser._id,
      favoris: req.session.currentUser === undefined ? null : req.session.currentUser.favoris
    }))

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
/*
router.get("/:id", (req, res, next) => {
  RestaurantModel.findById(req.params.id)
    .then((restaurant) => {

      let favorisHeart = req.session.currentUser !== undefined ? req.session.currentUser.favoris.includes(restaurant._id.toString()) : false
      let lat = restaurant.coordinates[0].toString()
      let lng = restaurant.coordinates[1].toString()
      ReviewModel.find({ restaurantId: req.params.id })
      .then((review) => {

        res.render("restaurants/restauPage.hbs", { restaurant: restaurant, reviews: review, favorisHeart: favorisHeart, lat: lat, lng: lng})

      });
    })
    .catch((dbErr) => {
      next(dbErr);
    });
});
*/

router.get("/:id", (req, res, next) => {
  RestaurantModel.findById(req.params.id)
  .then((restaurant) => {
      let favorisHeart = req.session.currentUser !== undefined ? req.session.currentUser.favoris.includes(restaurant._id.toString()) : false
      let lat = restaurant.coordinates[0].toString()
      let lng = restaurant.coordinates[1].toString()
      ReviewModel.find({restaurantId: req.params.id}).populate("userId")/*.populate("restaurantId")*/
      .then((review) => { 
        console.log(review); 
        res.render("restaurants/restauPage.hbs", { restaurant: restaurant, reviews: review, favorisHeart: favorisHeart, lat: lat, lng: lng})

        //UserModel.find({ userId: req.params.id })
      });
    })
    .catch((dbErr) => {
      next(dbErr);
    });
  });

//ROUTES GET to update restaurant
router.get("/:id/edit", (req, res, next) => {
  console.log(req.params.id);
  RestaurantModel.findById(req.params.id)
    .then((restaurant) => {
        res.render("restaurants/updateRestaurants.hbs", { restaurant: restaurant});
      })
    .catch((dbErr) => {
      next(dbErr);
    });
});

//ROUTES POST to update restaurant
router.post("/:id/edit", (req, res, next) => {

  RestaurantModel.findByIdAndUpdate(req.params.id, req.body)
      .then((dbSuccess) => { 
        console.log(dbSuccess)  
        res.redirect("/restaurants/" + req.params.id);
    })
    .catch((dbErr) => {
      next(dbErr);
    });
});





//ROUTES POST to delete restaurant
router.get("/:id/delete", (req, res, next) => {
 // console.log(req.params.id);
  RestaurantModel.findByIdAndRemove(req.params.id)
    .then(() => {   
        res.redirect("/restaurants");
    })
    .catch((dbErr) => {
      next(dbErr);
    });
});

/*router.get('/delete/:id', async (req, res, next) => {
  try {
    await RestaurantModel.findByIdAndRemove(req.params.id);
    res.redirect('/restaurants');
  } catch (err) {
    next(err);
  }
});*/


module.exports = router;
