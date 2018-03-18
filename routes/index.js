var express = require('express');
var router = express.Router();
var db = require('../database');
var config = require('./../config.json');
var session = require('express-session');
var mysqldumper = require('../mysqldumper');
var betz = require('../betz');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express', username: req.session.username });
});

router.post('/logout', function(req, res, next) {
  req.session.username = false;
  res.redirect('back');
});



module.exports = router;
