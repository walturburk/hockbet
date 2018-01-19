var express = require('express');
var router = express.Router();
const https = require('https');
var MySportsFeeds = require("mysportsfeeds-node");
var msf = new MySportsFeeds("1.0", true);


router.get('/', function(req, res, next) {

  console.log("hej");
  msf.authenticate("walturburk", "actioncop");

  var data = msf.getData('nhl', '2016-2017-regular', 'scoreboard', 'json', {'fordate':'20171224'});
  console.log(data);

  res.send('respond with a resource');

  /*https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).explanation);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });*/

});


module.exports = router;
