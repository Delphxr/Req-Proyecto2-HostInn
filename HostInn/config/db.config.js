'use strict';
var mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : '25.6.225.17',
  user     : 'root',
  password : 'password',
  database : 'hostinn'
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;