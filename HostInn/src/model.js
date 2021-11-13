const dbConn = require('../config/db.config');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ELIMINAR

// Eliminar cuenta
const deleteAccount = function(err, id, estado){
  // var id = "'1'"
  // var estado = "'2'" 
  var sql = "UPDATE Cuenta SET Estado = " + estado +  " WHERE IdCuenta = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Eliminar habitacion
const deleteRoom = function (err, id, estado){
  // var id = "'1'"
  // var estado = "'2'"
  var sql = "UPDATE Habitacion SET Estado = " + estado +  " WHERE IdHabitacion = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Eliminar hotel
const deleteHotel = function (err, id, estado){
  // var id = "'1'"
  // var estado = "'2'"
  var sql = "UPDATE Hotel SET Estado = " + estado +  " WHERE IdHotel = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Eliminar reserva
const deleteReservation = function (err, id, estado){
  // var id = "'1'"
  // var estado = "'2'"
  var sql = "UPDATE Reserva SET Estado = " + estado +  " WHERE IdReserva = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Eliminar tarjeta
const deleteCreditCard = function (err, id, estado){
  // var id = "'1'"
  // var estado = "'2'"
  var sql = "UPDATE Tarjeta SET Estado = " + estado +  " WHERE IdTarjeta = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INSERTAR

// Insertar un nuevo administrador
const insertAdmin = function(err, cedula, nombre, fecha, cuenta){
  //var cedula = 123123
  //var nombre = "Max"
  //var fecha =  
  var sql = "INSERT INTO Cuenta (Cedula, Nombre, FechaContratacion, Cuenta_IdCuenta) VALUES ("+ cedula +"," + nombre + "," + fecha + "," + cuenta + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }

// Insertar un nuevo cliente 
const insertClient = function(err, nombre, apellidos, correo, nacionalidad, fecha, cuenta){
  //var cedula = 123123
  //var nombre = "Max"
  //var fecha =  
  var sql = "INSERT INTO Cliente (Nombre, Apellidos, Correo, Nacionalidad, FechaNacimiento, Cuenta_IdCuenta) VALUES ("+ nombre +"," + apellidos + "," + correo + "," + nacionalidad + "," + fecha + "," + cuenta +")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }

// Insertar una nueva cuenta
const insertCuenta = function(err, user, contrasenia){
  //var user = "'a'"
  //var contrasenia = "'asd'"
  var sql = "INSERT INTO Cuenta (Username, Contraseña) VALUES ("+ user +"," + contrasenia + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }

// Insertar una nueva factura
const insertCheck = function(err, numFactura, descripcion, fecha, total, reserva){
  var sql = "INSERT INTO Factura (NumFactura, Descipcion, Fecha, Total, Reserva_IdReserva) VALUES ("+ numFactura + "," + descripcion + "," + fecha + "," + total + "," + reserva +  ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

// Insertar un nuevo gerente
const insertManger = function(err, descripcion, hotel, admin){
  var sql = "INSERT INTO Gerente (Descipcion, Hotel_IdHotel, Administrador_IdAdministrador) VALUES ("+ descripcion + "," + hotel + "," + admin + ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

// Insertar un nuevo gerente de alto nivel
const insertHighManger = function(err, descripcion, hotel){
  var sql = "INSERT INTO Gerente_Alto_Nivel (Descipcion, Hotel_IdHotel) VALUES ("+ descripcion + "," + hotel + ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

// Buscar un hotel por su nombre (con una parte del nombre)
const searchWithName = function(err, search){
  // var search = "'eh'";
  dbConn.query("SELECT * FROM Hotel WHERE Nombre REGEXP " + search, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
};


  
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