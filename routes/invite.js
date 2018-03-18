var express = require('express');
var router = express.Router();
var betz = require('../betz');

router.get('/', function(req, res, next) {
  var groupname = req.query.group;
  res.render('invite', {groupname: groupname});
});

module.exports = router;
