var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./../config.json');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {

 var connection = mysql.createConnection({
   host     : config.host,
   user     : config.user,
   password : config.password,
   database : config.database
 });

 connection.connect();

 connection.query('SELECT * FROM hockey.users', function(err, rows, fields) {
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query.');
 });

 connection.end();

  res.render('index', { title: 'Express', username: req.session.username });
});

router.post('/logout', function(req, res, next) {
  req.session.username = false;
  res.redirect('back');
});

module.exports = router;
