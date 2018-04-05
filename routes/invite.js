var express = require('express');
var router = express.Router();
var betz = require('../betz');
'use strict';
const nodemailer = require('nodemailer');
var config = require('../config.json');

router.get('/', function(req, res, next) {
  var groupname = req.query.group;
  var email = req.body.email;
  req.query.group = req.body.group;
  res.render('invite', {groupname: groupname, invited: email});
});

router.post('/', function(req, res, next) {
  var email = req.body.email;
  var groupname = req.query.group;
  req.query.group = req.body.group;
  //res.redirect('back');


  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'radioproffs@gmail.com',
          pass: 'actioncop'
      }
  });

  const mailOptions = {
      from: 'hietanen@gmail.com',
      to: email,
      subject: 'Invitation to "'+groupname+'" hockeybetz group',
      text: 'Click this link to join "'+groupname+'" on hockeybetz '
  };

  console.log('created');
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
    } else {

    }
    console.log(info);
  });


  res.render('invite', {groupname: groupname, invited: email});


});

module.exports = router;
