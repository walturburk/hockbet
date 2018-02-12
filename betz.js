var db = require('database.js');

function createNewGroup(groupname, season) {
  db.query("INSERT INTO `hockey`.`groups` (`name`, `season`) VALUES ('"+groupname+"', '"+season+"');
", function(err, rows, fields) {
     if (!err) {
       console.log("Group '"+groupname+"' created");
     } else {
       console.log("Query error: "+err);
     }
   }
}
