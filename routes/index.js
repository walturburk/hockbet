var express = require('express');
var router = express.Router();
var db = require('../database');
var config = require('./../config.json');
var session = require('express-session');
var mysqldumper = require('../mysqldumper');
var betz = require('../betz');

/* GET home page. */
router.get('/', function(req, res, next) {

db.query('SELECT * FROM hockey.users', function(err, rows, fields) {
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query.');
 });


  res.render('index', { title: 'Express', username: req.session.username });
});

router.post('/logout', function(req, res, next) {
  req.session.username = false;
  res.redirect('back');
});

router.get('/dbsave', function(req, res, next) {
  mysqldumper.save();
  res.send("Current database saved to dump file");
});

router.get('/dbload', function(req, res, next) {
  mysqldumper.load();
  res.send("Database loaded from dump file");
});

router.get('/creategroup', function(req, res, next) {
  var groupname = req.query.name;
  betz.createNewGroup(groupname, 1718);
  res.send('ok its done: '+groupname);
});

router.get('/populategroup', function(req, res, next) {
  betz.populateGroup(1);
  res.send('ok its done');
});

module.exports = router;
