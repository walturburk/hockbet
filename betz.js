var db = require('./database.js');
var MySportsFeeds = require("mysportsfeeds-node");
var msf = new MySportsFeeds("1.0", true);
var betz = {}; //make sure betz is an object with the {} or it cant take methods

/*function insertQuery(table, data) {
  for (var i=0; i<data.length; i++) {
    data[i];
  }
}*/

/*function getAll() {

}*/

function createNewGroup(groupname, season) {
  var query = "INSERT INTO `hockey`.`groups` (`name`, `season`) VALUES ('"+groupname+"', '"+season+"');";
  db.query(query, function(err, rows, fields) {
     if (!err) {
       console.log("Group '"+groupname+"' created");
       return true;
     } else {
       console.log("Query error: "+err);
       return false;
     }
   });
}

function joinGroup(userid, groupid) {
  var query = "INSERT INTO `hockey`.`membership` (`userid`, `groupid`) VALUES ('"+userid+"', '"+groupid+"');";
  db.query(query, function(err, rows, fields) {
    if (!err) {
      console.log("user: "+userid+" group: "+groupid);
      return true;
    } else {
      console.log("fail: "+ err);
      return false;
    }
  });
}

function getTeamsFromAPI() {

  msf.authenticate("walturburk", "actioncop");

  var data = msf.getData('nhl', '2016-2017-regular', 'overall_team_standings', 'json', {});

  data.then(function(d) {
    var sqlpart = [];
    console.log(JSON.stringify(d));
    var myArray = d.overallteamstandings.teamstandingsentry;
    for (i = 0; i < myArray.length; i++) {
      sqlpart.push("('"+myArray[i].team.ID+"', '"+myArray[i].team.City+"', '"+myArray[i].team.Name+"')");
    }

    var sqlstring = sqlpart.join(", ");
    var query = "INSERT INTO `hockey`.`teams` (`id`, `city`, `name`) VALUES "+sqlstring+";";

    db.query(query, function(err, rows, fields) {
      console.log(query);
    });
    });

}

function populateGroup (group) {
  var query = "SELECT * FROM hockey.teams";
  db.query(query, function(err, rows, fields) {
    var q=[];
    for (var i=0; i<rows.length; i++) {
      q.push("("+group+", "+"'1718'"+", '"+rows[i].id+"', "+"''"+")");
    }
    var qpart = q.join(", ");
    var query = "INSERT INTO hockey.draft (groupid, season, team, user) VALUES "+qpart+";";
    db.query(query, function(err, rows, fields) {
      console.log(query);
    });
  });
}

function getShitFromApi() {
  /* A SHITTY EXAMPLE OF HOW TO USE CALLBACKS AND MYSQL

  function get_info(data, callback){

      var sql = "SELECT a from b where info = data";

      connection.query(sql, function(err, results){
            if (err){
              throw err;
            }
            console.log(results[0].objid); // good
            stuff_i_want = results[0].objid;  // Scope is larger than function

            return callback(results[0].objid);
    }
}


//usage

var stuff_i_want = '';

 get_info(parm, function(result){
    stuff_i_want = result;

    //rest of your code goes in here
 });*/
}

//add methods to betz object
betz.createNewGroup = createNewGroup;
betz.joinGroup = joinGroup;
betz.getTeamsFromAPI = getTeamsFromAPI;
betz.populateGroup = populateGroup;

//exports betz object
module.exports = betz;
