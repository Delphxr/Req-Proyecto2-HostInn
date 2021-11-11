const dbConn = require('../config/db.config');

/*var sql = "insert into Cuenta (IdCuenta, Username, Contraseña, Estado) values (2, 'meh', 'asd', 1)";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

dbConn.query("SELECT * FROM Cuenta", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
*/
var sql = "UPDATE Cuenta SET Estado = " + '2' +  " WHERE IdCuenta = " + '5';
dbConn.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result.affectedRows + " record(s) updated");
});

dbConn.query("SELECT * FROM Cuenta", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });