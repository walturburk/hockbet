var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  sess=req.session;
  sess.username=req.body.username;

  res.send('login');
});
