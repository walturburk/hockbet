var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./../config.json');
var md5 = require('md5');
var sess;

router.post('/', function(req, res, next) {

var username = req.body.username;
var password = md5(req.body.password);
console.log(username+password)

  var connection = mysql.createConnection({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database
  });

connection.connect();

connection.query('SELECT password FROM hockey.users WHERE username = "'+username+'"', function(err, rows, fields) {
  if (!err) {
    if (JSON.stringify(rows[0].password) == password) {
      req.session.username=username;
    } else {
      //res.send('wrong password');
    }
  } else {
    //res.send('wrong username');
  }
});

connection.end();

res.redirect('back');

  //res.send('login:'+username+" "+password);
});

module.exports = router;
