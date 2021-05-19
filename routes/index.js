var express = require('express');
var router = express.Router();
const protectRoute = require("./../middlewares/protectRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/users', function(req, res, next) {
  console.log("SUCCESSSSSS")
});
module.exports = router;
