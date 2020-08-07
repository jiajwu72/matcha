
const config=require('../config')
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : config.database.host,
  user     : config.database.user,
  password : config.database.password,
  database : config.database.dbName
});

//connection.connect();

module.exports=connection
