var express = require("express");
var router = express.Router();
const RestaurantModel = require("./../models/Restaurant");
const protectRoute = require("./../middlewares/protectRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");
const ReviewModel = require("./../models/Review");

//ROUTES POST to update restaurant


  router.post("/restaurant/:id", (req, res, next) => {
    console.log("HERE")
    const newReview = { ...req.body };
    newReview.restaurantId = req.params.id;
    newReview.userId = req.session.currentUser._id
    console.log(newReview)
    ReviewModel.create(newReview)
      .then((dbResult) => {
        console.log(dbResult);
        res.redirect("/restaurants/" + req.params.id);
      })
      .catch((dbErr) => next(dbErr));
  });
  

  module.exports = router;