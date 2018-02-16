var db = require('./database.js');
var betz = {}; //make sure betz is an object with the {} or it cant take methods

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

function getTeamsFromApi() {
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

//exports betz object
module.exports = betz;
