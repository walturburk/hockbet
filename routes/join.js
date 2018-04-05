var express = require('express');
var router = express.Router();
var session = require('express-session');
var betz = require('../betz');

router.get('/', function(req, res, next) {
  res.send("Select a group to join");
});

router.get('/:groupid', function(req, res, next) {

  var user = req.session.username
  var group = req.params.groupid;

  if (user) {

    betz.joinGroup(user, group);
    res.send('USER :'+user+" JOINED GROUP: "+group);

  } else {

    res.redirect('/');

  }

});

router.post('/:groupid', function(req, res, next) {
  var username = req.body.username;
  var password = md5(req.body.password);

  betz.registerUser(username, password, req, function(sess) {
    res.send('REGISTERED USER '+sess.username+' AND LOGGED IN');
  });
});

module.exports = router;
