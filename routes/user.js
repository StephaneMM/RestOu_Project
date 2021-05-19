var express = require('express');
var router = express.Router();
const protectRoute = require("./../middlewares/protectRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");
const User = require("./../models/User");
const UserModel = require('./../models/User');
const RestaurantModel = require('../models/Restaurant');
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.send('respond with a resource');
});

router.get('/wish-list', function(req, res, next) {
  console.log(req.session)
  if(req.session.currentUser !== undefined) {
    console.log(req.session.currentUser.favoris)
    console.log("WISHLIST")
    RestaurantModel.find( { _id : { $in : req.session.currentUser.favoris } } ).then((response) => {

      res.render("users/wish-list.hbs",{favoris: response})
    })
  } else {
    res.redirect('/restaurants')
  }

});

router.post('/wish-list', function(req, res, next) {
  User.findById(req.query.user).then((response) => {
    if(!response.favoris.includes(req.query.restaurant)) {

      response.favoris.push(req.query.restaurant)
      response.save()
    }
  }).catch((dbErr) => next(dbErr));


});

router.patch('/wish-list-delete', function(req, res, next) {

  const favoris = req.query.favoris.filter(item => item !== req.query.restaurant)

  UserModel.findByIdAndUpdate(req.query.user, {favoris: favoris}, { new: true })
  .then((response) => {
    console.log(response)
  }).catch((dbErr) => next(dbErr));


 



});

module.exports = router;
