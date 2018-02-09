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
  if (err1) throw err1;
    fs.readFile('data.sql', 'utf8', function(err2, data2) {
      if (err1) throw err1;
        database.query(data1, function(err3, rows, fields) {
          if (err3) throw err3;
          console.log(data1);

          const regex = /;\nINSERT INTO(.*)VALUES/g;
          const subst = `,`;

          // The substituted value will be contained in the result variable
          const result = data2.replace(regex, subst);

          console.log('Substitution result: ', result);


          database.query(result, function(err4, rows, fields) {
            if(err4) throw err4;
            console.log(data2);
          });
        });
    });
});

};
