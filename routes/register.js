var express = require('express');
var router = express.Router();
var md5 = require('md5');
var session = require('express-session');
var db = require('../database');
var config = require('./../config.json');
var betz = require('../betz');



/* REGISTER. */
router.get('/', function(req, res, next) {
  res.send('GET'+req.body.username);
});


router.post('/', function(req, res, next) {

  var username = req.body.username;
  var password = md5(req.body.password);

  betz.registerUser(username, password, req, function(sess) {
    res.send('REGISTERED USER '+sess.username+' AND LOGGED IN');
  });

  console.log(md5(req.body.password));

});

module.exports = router;
