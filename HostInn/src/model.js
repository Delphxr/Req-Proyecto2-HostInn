const dbConn = require('../config/db.config');

const insertCuenta = function(err, user, contrasenia){
//var user = "'a'"
//var contrasenia = "'asd'"
var sql = "INSERT INTO Cuenta (Username, Contraseña, Estado) VALUES ("+ user +"," +contrasenia + ", 1)";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

dbConn.query("SELECT * FROM Cuenta", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
/*
var sql = "UPDATE Cuenta SET Estado = " + '2' +  " WHERE IdCuenta = " + '5';
dbConn.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result.affectedRows + " record(s) updated");
});
*/

// Buscar un hotel por su nombre (con una parte del nombre)
const searchWithName = function(err, search){
    dbConn.query("SELECT * FROM Hotel WHERE Nombre REGEXP " + search, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
};
