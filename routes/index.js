var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {

  var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'hockeyapp',
   password : 'actioncop',
   database : 'hockey'
 });

 connection.connect();

 connection.query('SELECT * FROM hockey.users', function(err, rows, fields) {
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query.');
 });

 connection.end();

  res.render('index', { title: 'Express' });
});

module.exports = router;
