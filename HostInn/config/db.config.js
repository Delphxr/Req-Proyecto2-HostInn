'use strict';
var mysql = require('mysql2');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ramifer5',
  database : 'hostinn'
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;