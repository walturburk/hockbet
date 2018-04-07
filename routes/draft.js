var express = require('express');
var router = express.Router();
var session = require('express-session');
var betz = require('../betz');

router.get('/create/:group', function(req, res, next) {
  var group = req.params.group;
  betz.createDraftOrder(group);
  res.redirect('back');
});

router.get('/:group', function(req, res, next) {

  var group = req.params.group;

  betz.printDraft(group, function(rows) {
    res.send("TEAM: "+rows[0].order); //TODO make it print out draftorder and clickable teams after
  });

});

router.post('/:group/select', function(req, res, next) {
  var order = 1;

  var user = req.session.username;
  var team = req.body.team;
  var group = req.params.group;

  betz.selectTeam(group, user, team, order);

  res.redirect('back');

});

module.exports = router;
