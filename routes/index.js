var express = require('express');
var router = express.Router();
const protectRoute = require("./../middlewares/protectRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/restaurants');
});


module.exports = router;
