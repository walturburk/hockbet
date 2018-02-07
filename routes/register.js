var express = require('express');
var router = express.Router();
var md5 = require('md5');
var session = require('express-session');
var db = require('../database');
var config = require('./../config.json');

/* REGISTER. */
router.get('/', function(req, res, next) {
  res.send('GET'+req.body.username);
});

var sess;
router.post('/', function(req, res, next) {



  var username = req.body.username;
  var password = md5(req.body.password);

  db.query("INSERT INTO `hockey`.`users` (`username`, `password`) VALUES ('"+username+"', '"+password+"');", function(err, rows, fields) {
    if (!err) {
      console.log("SUCCESS:"+rows);
      sess=req.session;
      sess.username=req.body.username;
      res.send('REGISTERED USER '+sess.username+' AND LOGGED IN');
    } else {
      console.log("Error performing query");
      res.send('ERROR');
    }
  });


  console.log(md5(req.body.password));

});

module.exports = router;
