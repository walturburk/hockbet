var mysql = require('mysql');
var config = require('./config.json');
var connection;

function connectToDatabase() {
  if (!connection) {
    var connection = mysql.createPool({
      host     : config.host,
      user     : config.user,
      password : config.password,
      database : config.database,
      connectionLimit: 10,
      supportBigNumbers: true
    });

    connection.connect();
  }
  return connection;
}

module.exports = connectToDatabase();
