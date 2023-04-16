var express = require('express');
var router = express.Router();
var check_login = require('../middleware/check_login');

/* GET home page. */
router.get('/',check_login.request_login, function(req, res, next) {
  res.render('index');
});

module.exports = router;
