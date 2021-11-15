const dbConn = require('../config/db.config');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SELECT

// Selecciona los hoteles 
function selectHotels (callback){
  dbConn.query('SELECT IdHotel, Nombre, Estrellas, Descripcion, Ubicación, Estado FROM Hotel', function(err, result){
  if (err) 
    callback(err,null);
  else
    callback(null,result);
  });
};

// Selecciona un hoteles por id
function selectHotelUnique (callback, id){
  dbConn.query("SELECT IdHotel, Nombre, Estrellas, Descripcion, Ubicación, Estado FROM Hotel WHERE Idhotel = " + id, function(err, result){
  if (err) 
    callback(err,null);
  else
    callback(null,result);
  });
};

// Seleccionar administradores
function selectAdmin (callback){
  dbConn.query("SELECT IdAdministrador, Cedula, Nombre, FechaContratacion, Cuenta_IdCuenta FROM Administrador", function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

// Seleccionar clientes
function selectClient (callback){
  dbConn.query("SELECT IdCliente, Nombre, Apeliidos, Correo, Nacionalidad, FechaNacimiento, Cuenta_IdCuenta FROM Cliente", function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

// Seleccionar cuentas
function selectAccounts (callback){
  dbConn.query("SELECT IdCuenta, Username, Contraseña, Estado, Categoria_IdCategoria FROM Cuenta", function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

// Seleccionar facturas
function selectCheck (callback){
  dbConn.query("SELECT NumFactura, Descripcion, Fecha, Total, Reserva_IdReserva FROM Factura", function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

// Seleccionar gerente
function selectManagers (callback){
  dbConn.query("SELECT IdGerente, Descripcion, Hotel_IdHotel, Administrador_IdAdministrador FROM Cuenta", function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

// Seleccionar gerentes de alto nivel
function selectHighManagers (callback){
  dbConn.query("SELECT IdGerente_Alto_Nivel, Descripcion, Administradro_IdAdministrador FROM Gerente_Alto_Nivel", function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

// Seleccionar gerentes de alto nivel por hotel
function selectHighManagersXHotel (callback){
  dbConn.query("SELECT Gerente_Alto_Nivel_IdGerente_Alto_Nivel, Hotel_IdHotel FROM Gerente_Alto_Nivel_has_Hotel", function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

// Seleccionar habitaciones
function selectRooms (callback){
  dbConn.query("SELECT IdHabitacion, Nombre, Tipo, Num_Camas, Capacidad, Descripcion, Precio, Estado, Hotel_IdHotel FROM Habitacion", function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

// Seleccionar habitacion especifica
function selectOneRoom (callback, idroom){
  dbConn.query("SELECT IdHabitacion, Nombre, Tipo, Num_Camas, Capacidad, Descripcion, Precio, Estado, Hotel_IdHotel FROM Habitacion WHERE IdHabitacion = " + idroom, function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

// Seleccionar habitaciones pod hotel
function selectRoomsUnique (callback, idHotel){
  dbConn.query("SELECT IdHabitacion, h.Nombre, Tipo, Num_Camas, Capacidad, h.Descripcion, Precio, h.Estado, Hotel_IdHotel, a.Nombre as nombreHotel, a.Descripcion as descripcionHotel FROM Habitacion h INNER JOIN Hotel a ON h.Hotel_IdHotel = a.IdHotel WHERE Hotel_IdHotel =" + idHotel, function (err, result) {
  if (err)
    callback(err, null);
  else
      callback(null,result);    
  });
};

// Seleccionar metodos de pago
function selectMethod (callback){
  dbConn.query("SELECT IdMetodo, Tipo FROM 'metodo de pago'", function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

// Seleccionar metodo de pago por cliente
function selectMethodXClient (callback){
  dbConn.query("SELECT Cliente_IdCliente, 'Metodo de pago_IdMetodo' FROM 'metodo de pago_has_cliente'", function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

// Seleccionar recepcionistas 
function selectReceptionist (callback){ 
  dbConn.query("SELECT IdRecepcionista, Descripcion, Hotel_IdHotel, Administrador_IdAdministrador FROM Recepcionista", function (err, result, fields) { 
  if (err) 
    callback(err, null); 
  else 
    callback(null,result); 
  }); 
}; 

// Seleccionar recepcionistas por reserva 
function selectReceptionistReserve (callback){ 
  dbConn.query("SELECT Recepcionista_IdRecepcionista, Reserva_IdReserva FROM Recepcionista_has_Reserva", function (err, result, fields) { 
  if (err) 
    callback(err, null); 
  else 
    callback(null,result); 
  }); 
}; 

// Seleccionar reserva 
function selectReservation (callback){ 
  dbConn.query("SELECT * FROM Reserva", function (err, result, fields) { 
  if (err) 
    callback(err, null); 
  else 
    callback(null,result); 
  }); 
};

// Seleccionar reserva 
function selectReservationUnique (callback, id){ 
  dbConn.query("SELECT * FROM Reserva WHERE IdReserva = " + id, function (err, result, fields) { 
  if (err) 
    callback(err, null); 
  else 
    callback(null,result); 
  }); 
};

function selectReservationByCliente (callback, id){ 
  dbConn.query("SELECT * FROM Reserva WHERE Cliente_IdCliente = " + id, function (err, result, fields) { 
  if (err) 
    callback(err, null); 
  else 
    callback(null,result); 
  }); 
}; 

//Seleccionar cuentas con información
function selectHighManagers (callback){
  dbConn.query("SELECT c.IdCuenta,c.Username,c.Contraseña,", function (err, result) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};

//Seleccionar categorias
function selectCategories (callback){
  dbConn.query("SELECT IdCategoria, Categoria FROM categoria", function (err, result, fields) {
  if (err)
    callback(err, null);
  else
    callback(null,result);
  });
};
module.exports = {
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COMPLEMENTARIOS

  // Buscar un hotel por su nombre (con una parte del nombre)
  searchWithName: function(err, search){
    // var search = "'eh'";
    dbConn.query("SELECT * FROM Hotel WHERE Nombre REGEXP " + search, function (err, result, fields) {
      if (err) throw err;
        console.log(result);
    });
  },

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ELIMINAR

  // Eliminar cuenta
  deleteAccount: function(err, id, estado){
    // var id = "'1'"
    // var estado = "'2'" 
    var sql = "UPDATE Cuenta SET Estado = " + estado +  " WHERE IdCuenta = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Eliminar habitacion
  deleteRoom: function (err, id, estado){
    // var id = "'1'"
    // var estado = "'2'"
    var sql = "UPDATE Habitacion SET Estado = " + estado +  " WHERE IdHabitacion = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Eliminar hotel
  deleteHotel: function (err, id, estado){
    // var id = "'1'"
    // var estado = "'2'"
    var sql = "UPDATE Hotel SET Estado = " + estado +  " WHERE IdHotel = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Eliminar reserva
  deleteReservation: function (err, id, estado){
    // var id = "'1'"
    // var estado = "'2'"
    var sql = "UPDATE Reserva SET Estado = " + estado +  " WHERE IdReserva = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Eliminar tarjeta
  deleteCreditCard: function (err, id, estado){
    // var id = "'1'"
    // var estado = "'2'"
    var sql = "UPDATE Tarjeta SET Estado = " + estado +  " WHERE IdTarjeta = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INSERTAR

  // Insertar un nuevo administrador
  insertAdmin: function(err, cedula, nombre, fecha, cuenta){
    //var cedula = 123123
    //var nombre = "Max"
    //var fecha =  
    var sql = "INSERT INTO Cuenta (Cedula, Nombre, FechaContratacion, Cuenta_IdCuenta) VALUES ("+ cedula +"," + nombre + "," + fecha + "," + cuenta + ")";
      dbConn.query(sql, function (err, result) {
        if (err) throw err;
          console.log("1 record inserted");
      });
    },

  // Insertar un nuevo cliente 
  insertClient: function(err, nombre, apellidos, correo, nacionalidad, fecha, cuenta){
    //var cedula = 123123
    //var nombre = "Max"
    //var fecha =  
    var sql = "INSERT INTO Cliente (Nombre, Apeliidos, Correo, Nacionalidad, FechaNacimiento, Cuenta_IdCuenta) VALUES ("+ nombre +"," + apellidos + "," + correo + "," + nacionalidad + "," + fecha + "," + cuenta +")";
      dbConn.query(sql, function (err, result) {
        if (err) throw err;
          console.log("1 record inserted");
      });
    },

  // Insertar una nueva cuenta
  insertCuenta: function(err, user, contrasenia, categoria){
    //var user = "'a'"
    //var contrasenia = "'asd'"
    var sql = "INSERT INTO Cuenta (Username, Contraseña,Categoria_IdCategoria) VALUES ("+ user +"," + contrasenia + ","+ categoria +")";
      dbConn.query(sql, function (err, result) {
        if (err) throw err;
          console.log("1 record inserted");
      });
    },

  // Insertar una nueva factura
  insertCheck: function(err, numFactura, descripcion, fecha, total, reserva){
    var sql = "INSERT INTO Factura (NumFactura, Descipcion, Fecha, Total, Reserva_IdReserva) VALUES ("+ numFactura + "," + descripcion + "," + fecha + "," + total + "," + reserva +  ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar un nuevo gerente
  insertManger: function(err, descripcion, hotel, admin){
    var sql = "INSERT INTO Gerente (Descipcion, Hotel_IdHotel, Administrador_IdAdministrador) VALUES ("+ descripcion + "," + hotel + "," + admin + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar un nuevo gerente de alto nivel
  insertHighManger: function(err, descripcion, hotel){
    var sql = "INSERT INTO Gerente_Alto_Nivel (Descipcion, Hotel_IdHotel) VALUES ("+ descripcion + "," + hotel + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar un gerente de alto nivel por hotel
  insertHighMangerXHotel: function(err, gerente, hotel){
    var sql = "INSERT INTO Gerente_Alto_Nivel_has_Hotel (Gerente_Alto_Nivel_IdGerente_Alto_Nivel, Hotel_IdHotel) VALUES ("+ gerente + "," + hotel + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar una habitacion
  insertRoom: function(err, nombre, tipo, numCamas, capacidad, descripcion, precio, hotel){
    var sql = "INSERT INTO Habitacion (Nombre, Tipo, Num_Camas, Capacidad, Descripcion, Precio, Hotel_IdHotel) VALUES ("+ nombre + "," + tipo + "," + numCamas + "," + capacidad + "," + descripcion+ "," + precio + "," + hotel + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar un nuevo hotel
  insertHotel: function(err, nombre, estrellas, descripcion, ubicacion){
    var sql = "INSERT INTO Hotel (Nombre, Estrellas, Descripcion, Ubicacion) VALUES (" + nombre + "," + estrellas + "," + descripcion + "," + ubicacion + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar metodo de pago
  insertMethod: function(err, tipo){
    var sql = "INSERT INTO 'Metodo de pago' (Tipo) VALUES (" + tipo + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar metodo de pago por cliente
  insertMethodXClient: function(err, cliente, metodo){
    var sql = "INSERT INTO 'Metodo de pago_has_Cliente' (Cliente_IdCliente, 'Metodo de pago_IdMetodo') VALUES ("+ cliente + "," + metodo + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  },

  // Insertar un nuevo recepcionista
  insertReceptionist: function(err, descripcion, hotel, admin){
    var sql = "INSERT INTO Recepcionista (Descripcion, Hotel_IdHotel, Administrador_IdAdministrador) VALUES ("+ descripcion + "," + hotel + "," + admin + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar un nuevo recepcionista por reserva
  insertReceptionistXReservation: function(err, recepcionista, reserva){
    var sql = "INSERT INTO Recepcionista_has_Reserva (Recepcionista_IdRecepcionista, Reserva_IdReserva) VALUES ("+ recepcionista + "," + reserva + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar una reserva
  insertReservation: function(err, fechaInicio, fechaFinal, monto, cliente, habitacion, metodo){
    var sql = "INSERT INTO Reserva (FechaInicio, FechaFin, Monto, Cliente_IdCliente, Habitacion_IdHabitacion, 'Metodo de pago_IdMetodo') VALUES ("+ fechaInicio + "," + fechaFinal + "," + monto + "," + cliente + "," + habitacion + "," + metodo + "," + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar una tarjeta
  insertCreditCard: function(err, numTarjeta, tarHabitante, CCV, fecha, cliente, metodo){
    var sql = "INSERT INTO Tarjeta (NumTarjeta, TarjetaHabitante, CCV, FechaCaducidad, Cliente_IdCliente, 'Metodo de pago_IdMetodo') VALUES ("+ numTarjeta + "," + tarHabitante + "," + CCV + "," + fecha + "," + cliente + "," + metodo + ")";
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE

  // Actualizar los datos de un administrador
  updateAdmin: function(err, id, cedula, nombre, fecha){
    var sql = "UPDATE Administrador SET Cedula = " + cedula + ", Nombre = " + nombre +  ", FechaContratacion = " + fecha + " WHERE IdAdministrador = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un cliente
  updateClient: function(err, id, nombre, apellidos, correo, nacionalidad, fecha){
    var sql = "UPDATE Cliente SET Nombre = " + nombre + ", Apeliidos = " + apellidos +  ", Correo = " + correo + ", Nacionalidad = " + nacionalidad + ", FechaNacimiento = " + fecha + " WHERE IdCliente = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de una cuenta
  updateAccount: function(err, id, username, contrasenia, categoria){
    var sql = "UPDATE Cuenta SET Username = " + username + ", Contraseña = " + contrasenia + ", Categoria_IdCategoria = "+ categoria +" WHERE IdCuenta = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de las facturas
  updateCheck: function(err, id, descripcion, fecha, total){
    var sql = "UPDATE Factura SET Descripcion = " + descripcion + ", Fecha = " + fecha +  ", Total = " + total + " WHERE IdFactura = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un gerente
  updateManager: function(err, id, descripcion, hotel){
    var sql = "UPDATE Gerente SET Descripcion = " + descripcion + ", Hotel_IdHotel = " + hotel + " WHERE IdGerente = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un alto gerente
  updateHighManager: function(err, id, descripcion){
    var sql = "UPDATE Gerente_Alto_Nivel SET Descripcion = " + descripcion + " WHERE IdGerente_Alto_Nivel = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de una habitacion
  updateRoom: function(err, id, nombre, tipo, numCamas, capacidad, descripcion, precio){
    var sql = "UPDATE Habitacion SET Nombre = " + nombre + ", Tipo = " + tipo +  ", Num_camas = " + numCamas + ", Capacidad = " + capacidad + ", Descripcion = " + descripcion + ", Precio = " + precio + " WHERE IdHabitacion = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un hotel
  updateHotel: function(err, id, nombre, estrellas, descripcion, ubicacion){
    var sql = "UPDATE Hotel SET Nombre = " + nombre + ", Estrellas = " + estrellas +  ", Descripcion = " + descripcion + ", Ubicacion = " + ubicacion + " WHERE IdHotel = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un metodo de pago
  updateMethod: function(err, id, tipo){
    var sql = "UPDATE 'metodo de pago' SET Tipo = " + tipo + " WHERE IdMetodo = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un recepcionista
  updateReceptionist: function(err, id, descripcion, hotel){
    var sql = "UPDATE Recepcionista SET Descripcion = " + descripcion + ", Hotel_IdHotel = " + hotel + " WHERE IdRecepcionista = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de una reserva
  updateReservation: function(err, id, fechaInicio, fechaFinal, monto, cliente, habitacion){
    var sql = "UPDATE Reserva SET FechaInicio = " + fechaInicio + ", FechaFin = " + fechaFinal +  ", Monto = " + monto + ", Cliente_IdCliente = " + cliente + ", Habitacion_IdHabitacion = " + habitacion + " WHERE IdReserva = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de una tarjeta de credito
  updateCreditCard: function(err, id, numTarjeta, tarHabitante, CCV, fecha){
    var sql = "UPDATE Tarjeta SET NumTarjeta = " + numTarjeta + ", TarjetaHabitante = " + tarHabitante +  ", CCV = " + CCV + ", FechaCaducidad = " + fecha + " WHERE IdTarjeta = " + id;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  selectHotels,
  selectAdmin,
  selectClient,
  selectAccounts,
  selectCheck,
  selectManagers,
  selectHighManagers,
  selectHighManagersXHotel,
  selectRooms,
  selectOneRoom,
  selectRoomsUnique,
  selectMethod,
  selectMethodXClient,
  selectReceptionist,
  selectReceptionistReserve,
  selectReservation,
  selectReservationUnique,
  selectReservationByCliente,
  selectHotelUnique,
  selectCategories
}
