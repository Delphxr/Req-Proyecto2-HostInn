const dbConn = require('../config/db.config');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COMPLEMENTARIOS

// Buscar un hotel por su nombre (con una parte del nombre)
const searchWithName = function(err, search){
  // var search = "'eh'";
  dbConn.query("SELECT * FROM Hotel WHERE Nombre REGEXP " + search, function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
};

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

// Insertar un gerente de alto nivel por hotel
const insertHighMangerXHotel = function(err, gerente, hotel){
  var sql = "INSERT INTO Gerente_Alto_Nivel_has_Hotel (Gerente_Alto_Nivel_IdGerente_Alto_Nivel, Hotel_IdHotel) VALUES ("+ gerente + "," + hotel + ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log("1 record inserted");
  });
}

// Insertar una habitacion
const insertRoom = function(err, nombre, tipo, numCamas, capacidad, descripcion, precio, hotel){
  var sql = "INSERT INTO Habitacion (Nombre, Tipo, Num_Camas, Capacidad, Descripcion, Precio, Hotel_IdHotel) VALUES ("+ nombre + "," + tipo + "," + numCamas + "," + capacidad + "," + descripcion+ "," + precio + "," + hotel + ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log("1 record inserted");
  });
}

// Insertar un nuevo hotel
const insertHotel = function(err, nombre, estrellas, descripcion, ubicacion){
  var sql = "INSERT INTO Hotel (Nombre, Estrellas, Descripcion, Ubicacion) VALUES (" + nombre + "," + estrellas + "," + descripcion + "," + ubicacion + ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log("1 record inserted");
  });
}

// Insertar metodo de pago
const insertMethod = function(err, tipo){
  var sql = "INSERT INTO 'Metodo de pago' (Tipo) VALUES (" + tipo + ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log("1 record inserted");
  });
}

// Insertar metodo de pago por cliente
const insertMethodXClient = function(err, cliente, metodo){
  var sql = "INSERT INTO 'Metodo de pago_has_Cliente' (Cliente_IdCliente, 'Metodo de pago_IdMetodo') VALUES ("+ cliente + "," + metodo + ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

// Insertar un nuevo recepcionista
const insertReceptionist = function(err, descripcion, hotel, admin){
  var sql = "INSERT INTO Recepcionista (Descripcion, Hotel_IdHotel, Administrador_IdAdministrador) VALUES ("+ descripcion + "," + hotel + "," + admin + ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log("1 record inserted");
  });
}

// Insertar un nuevo recepcionista por reserva
const insertReceptionistXReservation = function(err, recepcionista, reserva){
  var sql = "INSERT INTO Recepcionista_has_Reserva (Recepcionista_IdRecepcionista, Reserva_IdReserva) VALUES ("+ recepcionista + "," + reserva + ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log("1 record inserted");
  });
}

// Insertar una reserva
const insertReservation = function(err, fechaInicio, fechaFinal, monto, cliente, habitacion, metodo){
  var sql = "INSERT INTO Reserva (FechaInicio, FechaFin, Monto, Cliente_IdCliente, Habitacion_IdHabitacion, 'Metodo de pago_IdMetodo') VALUES ("+ fechaInicio + "," + fechaFinal + "," + monto + "," + cliente + "," + habitacion + "," + metodo + "," + ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log("1 record inserted");
  });
}

// Insertar una tarjeta
const insertCreditCard = function(err, numTarjeta, tarHabitante, CCV, fecha, cliente, metodo){
  var sql = "INSERT INTO Tarjeta (NumTarjeta, TarjetaHabitante, CCV, FechaCaducidad, Cliente_IdCliente, 'Metodo de pago_IdMetodo') VALUES ("+ numTarjeta + "," + tarHabitante + "," + CCV + "," + fecha + "," + cliente + "," + metodo + ")";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log("1 record inserted");
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SELECT

// Seleccionar administradores
const selectAdmin = function(err){
  dbConn.query("SELECT IdAdministrador, Cedula, Nombre, FechaContratacion, Cuenta_IdCuenta FROM Administrador", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar clientes
const selectCliente = function(err){
  dbConn.query("SELECT IdCliente, Nombre, Apellidos, Correo, Nacionalidad, FechaNacimiento, Cuenta_IdCuenta FROM Cliente", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar cuentas
const selectAccounts = function(err){
  dbConn.query("SELECT IdCuenta, Username, Contraseña, Estado FROM Cuenta", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar facturas
const selectCheck = function(err){
  dbConn.query("SELECT NumFactura, Descripcion, Fecha, Total, Reserva_IdReserva FROM Factura", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar gerente
const selectManagers = function(err){
  dbConn.query("SELECT IdGerente, Descripcion, Hotel_IdHotel, Administrador_IdAdministrador FROM Cuenta", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar gerentes de alto nivel
const selectHighManagers = function(err){
  dbConn.query("SELECT IdGerente_Alto_Nivel, Descripcion, Administradro_IdAdministrador FROM Gerente_Alto_Nivel", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar gerentes de alto nivel por hotel
const selectHighManagersXHotel = function(err){
  dbConn.query("SELECT Gerente_Alto_Nivel_IdGerente_Alto_Nivel, Hotel_IdHotel FROM Gerente_Alto_Nivel_has_Hotel", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar habitaciones
const selectRooms = function(err){
  dbConn.query("SELECT IdHabitacion, Nombre, Tipo, Num_Camas, Capacidad, Descripcion, Precio, Estado, Hotel_IdHotel FROM Habitacion", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar hoteles
const selectHotels = function(err){
  dbConn.query("SELECT IdHotel, Nombre, Estrellas, Descripcion, Ubicacion, Estado FROM Hotel", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar metodos de pago
const selectMethod = function(err){
  dbConn.query("SELECT IdMetodo, Tipo FROM 'metodo de pago'", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar metodo de pago por cliente
const selectMethodXClient = function(err){
  dbConn.query("SELECT Cliente_IdCliente, 'Metodo de pago_IdMetodo' FROM 'metodo de pago_has_cliente'", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar recepcionistas
const selectReceptionist = function(err){
  dbConn.query("SELECT IdRecepcionista, Descripcion, Hotel_IdHotel, Administrador_IdAdministrador FROM Recepcionista", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar recepcionistas por reserva
const selectHighManagersReserve = function(err){
  dbConn.query("SELECT Recepcionista_IdRecepcionista, Reserva_IdReserva FROM Recepcionista_has_Reserva", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar reserva
const selectReservation = function(err){
  dbConn.query("SELECT IdReserva, FehcaInicio, FechaFin, Monto, Estado, Cliente_IdCliente, Habitacion_IdHabitacion, 'Metodo de pago_IdMetodo' FROM Reserva", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

// Seleccionar tarjeta de credito
const selectCreditCard = function(err){
  dbConn.query("SELECT IdTarjeta, NumTarjeta, TarjetaHabitante, CCV, FechaCaducidad, Estado, Cliente_IdCliente, 'Metodo de pago_IdMetodo' FROM Tarjeta", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE

// Actualizar los datos de un administrador
const updateAdmin = function(err, id, cedula, nombre, fecha){
  var sql = "UPDATE Administrador SET Cedula = " + cedula + ", Nombre = " + nombre +  ", FechaContratacion = " + fecha + " WHERE IdAdministrador = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Actualizar los datos de un cliente
const updateClient = function(err, id, nombre, apellidos, correo, nacionalidad, fecha){
  var sql = "UPDATE Cliente SET Nombre = " + nombre + ", Apellidos = " + apellidos +  ", Correo = " + correo + ", Nacionalidad = " + nacionalidad + ", FechaNacimiento = " + fecha + " WHERE IdCliente = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Actualizar los datos de una cuenta
const updateAccount = function(err, id, username, contrasenia){
  var sql = "UPDATE Cuenta SET Username = " + user + ", Contraseña = " + contrasenia + " WHERE IdCuenta = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Actualizar los datos de las facturas
const updateCheck = function(err, id, descripcion, fecha, total){
  var sql = "UPDATE Factura SET Descripcion = " + descripcion + ", Fecha = " + fecha +  ", Total = " + total + " WHERE IdFactura = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Actualizar los datos de un gerente
const updateManager = function(err, id, descripcion, hotel){
  var sql = "UPDATE Gerente SET Descripcion = " + descripcion + ", Hotel_IdHotel = " + hotel + " WHERE IdGerente = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Actualizar los datos de un alto gerente
const updateHighManager = function(err, id, descripcion){
  var sql = "UPDATE Gerente_Alto_Nivel SET Descripcion = " + descripcion + " WHERE IdGerente_Alto_Nivel = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Actualizar los datos de una habitacion
const updateRoom = function(err, id, nombre, tipo, numCamas, capacidad, descripcion, precio){
  var sql = "UPDATE Habitacion SET Nombre = " + nombre + ", Tipo = " + tipo +  ", Num_camas = " + numCamas + ", Capacidad = " + capacidad + ", Descripcion = " + descripcion + ", Precio = " + precio + " WHERE IdHabitacion = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Actualizar los datos de un hotel
const updateHotel = function(err, id, nombre, estrellas, descripcion, ubicacion){
  var sql = "UPDATE Hotel SET Nombre = " + nombre + ", Estrellas = " + estrellas +  ", Descripcion = " + descripcion + ", Ubicacion = " + ubicacion + " WHERE IdHotel = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Actualizar los datos de un metodo de pago
const updateMethod = function(err, id, tipo){
  var sql = "UPDATE 'metodo de pago' SET Tipo = " + tipo + " WHERE IdMetodo = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Actualizar los datos de un recepcionista
const updateReceptionist = function(err, id, descripcion, hotel){
  var sql = "UPDATE Recepcionista SET Descripcion = " + descripcion + ", Hotel_IdHotel = " + hotel + " WHERE IdRecepcionista = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Actualizar los datos de una reserva
const updateReservation = function(err, id, fechaInicio, fechaFinal, monto, cliente, habitacion){
  var sql = "UPDATE Reserva SET FechaInicio = " + fechaInicio + ", FechaFin = " + fechaFinal +  ", Monto = " + monto + ", Cliente_IdCliente = " + cliente + ", Habitacion_IdHabitacion = " + habitacion + " WHERE IdReserva = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}

// Actualizar los datos de una tarjeta de credito
const updateCreditCard = function(err, id, numTarjeta, tarHabitante, CCV, fecha){
  var sql = "UPDATE Tarjeta SET NumTarjeta = " + numTarjeta + ", TarjetaHabitante = " + tarHabitante +  ", CCV = " + CCV + ", FechaCaducidad = " + fecha + " WHERE IdTarjeta = " + id;
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
}