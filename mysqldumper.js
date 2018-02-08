var config = require('./config.json');
var mysqlDump = require('mysqldump');
var database = require('./database');
var fs = require('fs');

exports.save = function() {
  mysqlDump({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database,
    schema : true,
    data : false,
    dest:'./structure.sql' // destination file
  },function(err){
    mysqlDump({
      host     : config.host,
      user     : config.user,
      password : config.password,
      database : config.database,
      schema : false,
      tables : config.getdatafrom,
      dest:'./data.sql' // destination file
    },function(err){
        // create data.sql file;
    });
  });


};

exports.load = function() {


fs.readFile('structure.sql', 'utf8', function(err1, data1) {

    fs.readFile('data.sql', 'utf8', function(err2, data2) {

        database.query(data1+data2, function(err3, rows, fields) {
          console.log(data1+data2);
        })
    });
});

};
