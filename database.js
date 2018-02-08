var mysql = require('mysql');
var config = require('./config.json');
var connection;

function connectToDatabase() {
  if (!connection) {
    var connection = mysql.createConnection({
      host     : config.host,
      user     : config.user,
      password : config.password,
      database : config.database
    });

    //connection.getConnection();
  }
  return connection;
}

module.exports = connectToDatabase();
