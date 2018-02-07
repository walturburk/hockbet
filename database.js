var mysql = require('mysql');
var config = require('./config.json');
var connection;

function condb() {
  if (!connection) {
    var connection = mysql.createConnection({
      host     : config.host,
      user     : config.user,
      password : config.password,
      database : config.database
    });

    connection.connect();
  }
  return connection;
}

module.exports = condb();
