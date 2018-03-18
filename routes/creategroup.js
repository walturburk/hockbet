var express = require('express');
var router = express.Router();
var betz = require('../betz');
var moment = require('moment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('creategroup', { title: 'Create group', username: req.session.username });
});

router.post('/send', function(req, res, next) {
  var groupname = req.body.groupname;
  var draftstart = req.body.draftstart;
  var timer = req.body.timer;
  var picks = req.body.picks;
  betz.createNewGroup(groupname, draftstart, timer, picks);
  console.log("DATE: "+req.body.draftstart);
  res.redirect('/invite?group='+groupname);
});

module.exports = router;
