var express = require('express');
var router = express.Router();
var db = require('../database');
var config = require('./../config.json');
var md5 = require('md5');
var sess;

router.post('/', function(req, res, next) {

var username = req.body.username;
var password = md5(req.body.password);
console.log(username+password)

db.query('SELECT password FROM hockey.users WHERE username = "'+username+'"', function(err, rows, fields) {
var returntext;
  if (!err) {
    if (rows[0].password == password) {
      req.session.username=username;
      returntext = 'username: '+username;
    } else {
      returntext = ("WRONG PASSWORD: <br>"+password+"<br>"+rows[0].password);
    }
  } else {
    returntext = ('wrong username');
  }
  //res.send(returntext);
  res.redirect('back');
});

connection.end();




});

module.exports = router;
