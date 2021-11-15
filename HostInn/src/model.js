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
  dbConn.query("SELECT IdHabitacion, h.Nombre, Tipo, Num_Camas, Capacidad, h.Descripcion, Precio, h.Estado, Hotel_IdHotel, a.Nombre as nombreHotel, a.Descripcion as descripcionHotel, a.Ubicación as Ubicación_hotel FROM Habitacion h INNER JOIN Hotel a ON h.Hotel_IdHotel = a.IdHotel WHERE Hotel_IdHotel =" + idHotel, function (err, result) {
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
  dbConn.query("SELECT IdRecepcionista, Descripcion, Hotel_IdHotel, Administrador_IdAdministrador FROM Recepcionista", function (err, result) { 
  if (err) 
    callback(err, null); 
  else 
    callback(null,result); 
  }); 
}; 

// Seleccionar recepcionistas 
function selectReceptionistbyGerente (callback, id){ 
  dbConn.query("select recepcionista.IdRecepcionista ,recepcionista.Administrador_IdAdministrador as idAdminRecepcionista, hotel.nombre as nombre_hotel, (SELECT Nombre from administrador where administrador.IdAdministrador = idAdminRecepcionista limit 1) as nombre_recepcionista  from recepcionista inner join hotel on hotel.IdHotel = recepcionista.Hotel_IdHotel inner join gerente on hotel.IdHotel = Gerente.Hotel_IdHotel inner join administrador on gerente.Administrador_IdAdministrador = administrador.idAdministrador where administrador.Cuenta_IdCuenta = 1", function (err, result) { 
  if (err) 
    callback(err, null); 
  else 
    callback(null,result); 
  }); 
}; 


// Seleccionar recepcionistas por reserva 
function selectReceptionistReserve (callback){ 
  dbConn.query("SELECT Recepcionista_IdRecepcionista, Reserva_IdReserva FROM Recepcionista_has_Reserva", function (err, result) { 
  if (err) 
    callback(err, null); 
  else 
    callback(null,result); 
  }); 
}; 

// Seleccionar reserva 
function selectReservation (callback){ 
  dbConn.query("SELECT * FROM Reserva", function (err, result) { 
  if (err) 
    callback(err, null); 
  else 
    callback(null,result); 
  }); 
};

// Seleccionar reserva 
function selectReservationUnique (callback, id){ 
  dbConn.query("SELECT * FROM Reserva WHERE IdReserva = " + id, function (err, result) { 
  if (err) 
    callback(err, null); 
  else 
    callback(null,result); 
  }); 
};

function selectReservationByCliente (callback, id){ 
  dbConn.query("SELECT * FROM Reserva WHERE Cliente_IdCliente = (SELECT Cliente.IdCliente FROM Cuenta INNER JOIN Cliente on  Cuenta.IdCuenta = Cliente.Cuenta_IdCuenta WHERE Cuenta_IdCuenta = " + id + ")", function (err, result) { 
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
  deleteAccount: function(err, idCuenta){
    // var id = "'1'"
    // var estado = "'2'" 
    var sql = "UPDATE Cuenta SET Estado = 0 WHERE IdCuenta = " + idCuenta;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Eliminar habitacion
  deleteRoom: function (err, idHabitacion){
    // var id = "'1'"
    // var estado = "'2'"
    var sql = "UPDATE Habitacion SET Estado = 0 WHERE IdHabitacion = " + idHabitacion;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Eliminar hotel
  deleteHotel: function (err, idHotel){
    // var id = "'1'"
    // var estado = "'2'"
    var sql = "UPDATE Hotel SET Estado = 0 WHERE IdHotel = " + idHotel;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Eliminar reserva
  deleteReservation: function (idReserva){
    // var id = "'1'"
    // var estado = "'2'"
    var sql = "UPDATE Reserva SET Estado = 0 WHERE IdReserva = " + idReserva;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Eliminar tarjeta
  deleteCreditCard: function (err, idTarjeta){
    // var id = "'1'"
    // var estado = "'2'"
    var sql = "UPDATE Tarjeta SET Estado = 0 WHERE IdTarjeta = " + idTarjeta;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INSERTAR

  // Insertar un nuevo administrador
  insertAdmin: function(cedula, nombre, fecha, cuenta){
    var sql = "INSERT INTO Cuenta (Cedula, Nombre, FechaContratacion, Cuenta_IdCuenta) VALUES (?,?,?,?)";
      dbConn.query(sql, [cedula,nombre,fecha,cuenta],function (err, result) {
        if (err) throw err;
          console.log("1 record inserted");
      });
    },

  // Insertar un nuevo cliente 
  insertClient: function(nombre, apellidos, correo, nacionalidad, fecha){
    var sql = "SELECT IdCuenta FROM Cuenta ORDER BY IdCuenta DESC LIMIT 1";
    dbConn.query(sql, function (err, cuenta) {
      if (err) throw err;
        resultado = JSON.parse(JSON.stringify(cuenta))
        parsed = resultado[0]
        var sql = "INSERT INTO Cliente (Nombre, Apeliidos, Correo, Nacionalidad, FechaNacimiento, Cuenta_IdCuenta) VALUES (?,?,?,?,?,?)";
        dbConn.query(sql, [nombre, apellidos, correo, nacionalidad, fecha, parsed.IdCuenta], function (err, result) {
          if (err) throw err;
            console.log("1 record inserted");
        });
    });
    },

  // Insertar una nueva cuenta
  insertCuenta: function(user, contrasenia, categoria){
    var sql = "INSERT INTO Cuenta (Username, Contraseña,Categoria_IdCategoria) VALUES (?,?,?)";
      dbConn.query(sql, [user, contrasenia, categoria], function (err, result) {
        if (err) throw err;
          console.log("1 record inserted");
      });
    },

  // Insertar una tarjeta
  insertCreditCard: function(numTarjeta, tarHabitante, CCV, fecha, metodo){
    var sql = "SELECT IdCliente FROM Cliente ORDER BY IdCliente DESC LIMIT 1";
    dbConn.query(sql, function (err, cliente) {
      if (err) throw err;
        resultado = JSON.parse(JSON.stringify(cliente))
        parsed = resultado[0]
        var sql = "INSERT INTO Tarjeta (NumTarjeta, TarjetaHabitante, CCV, FechaCaducidad, Cliente_IdCliente, Metodo_de_pago_IdMetodo) VALUES (?, ?, ?, ?, ?, ?)";
        dbConn.query(sql, [numTarjeta, tarHabitante, CCV, fecha, parsed.IdCliente + 1, metodo], function (err, result) {
          if (err) throw err;
            console.log("1 record inserted");
        });
    });
  },

  // Insertar una nueva factura
  insertCheck: function(numFactura, descripcion, fecha, total, reserva){
    var sql = "INSERT INTO Factura (NumFactura, Descipcion, Fecha, Total, Reserva_IdReserva) VALUES (?,?,?,?,?)";
    dbConn.query(sql, [numFactura, descripcion, fecha, total, reserva], function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar un nuevo gerente
  insertManger: function(descripcion, hotel, admin){
    var sql = "INSERT INTO Gerente (Descipcion, Hotel_IdHotel, Administrador_IdAdministrador) VALUES (?,?,?)";
    dbConn.query(sql, [descripcion, hotel, admin], function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar un nuevo gerente de alto nivel
  insertHighManger: function(descripcion, hotel){
    var sql = "INSERT INTO Gerente_Alto_Nivel (Descipcion, Hotel_IdHotel) VALUES (?,?)";
    dbConn.query(sql, [descripcion, hotel], function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar un gerente de alto nivel por hotel
  insertHighMangerXHotel: function(gerente, hotel){
    var sql = "INSERT INTO Gerente_Alto_Nivel_has_Hotel (Gerente_Alto_Nivel_IdGerente_Alto_Nivel, Hotel_IdHotel) VALUES (?, ?)";
    dbConn.query(sql, [gerente, hotel], function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar una habitacion
  insertRoom: function(nombre, tipo, numCamas, capacidad, descripcion, precio, hotel){
    var sql = "INSERT INTO Habitacion (Nombre, Tipo, Num_Camas, Capacidad, Descripcion, Precio, Hotel_IdHotel) VALUES (? , ?, ?, ?, ?, ?)";
    dbConn.query(sql, [nombre, tipo, numCamas, capacidad, descripcion, precio, hotel], function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar un nuevo hotel
  insertHotel: function(nombre, estrellas, descripcion, ubicacion){
    var sql = "INSERT INTO Hotel (Nombre, Estrellas, Descripcion, Ubicacion) VALUES (?, ?, ?, ?)";
    dbConn.query(sql, [nombre, estrellas, descripcion, ubicacion], function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar metodo de pago
  insertMethod: function(tipo){
    var sql = "INSERT INTO 'Metodo de pago' (Tipo) VALUES (?)";
    dbConn.query(sql, [tipo], function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar metodo de pago por cliente
  insertMethodXClient: function(cliente, metodo){
    var sql = "INSERT INTO 'Metodo de pago_has_Cliente' (Cliente_IdCliente, Metodo_de_pago_IdMetodo) VALUES (?, ?)";
    dbConn.query(sql, [cliente, metodo], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  },

  // Insertar metodo de pago por cliente desde la web
  insertMethodXClientWeb: function(metodo){
    var sql = "SELECT IdCliente FROM Cliente ORDER BY IdCliente DESC LIMIT 1";
    dbConn.query(sql, function (err, cliente) {
      resultado = JSON.parse(JSON.stringify(cliente))
      parsed = resultado[0]
      var sql = "INSERT INTO Metodo_de_pago_has_Cliente (Cliente_IdCliente, Metodo_de_pago_IdMetodo) VALUES (?, ?)";
        dbConn.query(sql, [parsed.IdCliente + 1, metodo], function (err, result) {
        if (err) throw err;
          console.log("1 record inserted");
      });
    });
  },

  // Insertar un nuevo recepcionista
  insertReceptionist: function(descripcion, hotel, admin){
    var sql = "INSERT INTO Recepcionista (Descripcion, Hotel_IdHotel, Administrador_IdAdministrador) VALUES (?, ?, ?)";
    dbConn.query(sql, [descripcion, hotel, admin], function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar un nuevo recepcionista por reserva
  insertReceptionistXReservation: function(recepcionista, reserva){
    var sql = "INSERT INTO Recepcionista_has_Reserva (Recepcionista_IdRecepcionista, Reserva_IdReserva) VALUES (? ,?)";
    dbConn.query(sql, [recepcionista, reserva], function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

  // Insertar una reserva
  insertReservation: function(fechaInicio, fechaFinal, monto, cliente, habitacion, metodo){
    var sql = "INSERT INTO Reserva (FechaInicio, FechaFin, Monto, Cliente_IdCliente, Habitacion_IdHabitacion, 'Metodo de pago_IdMetodo') VALUES (?, ?, ?, ?, ?, ?)";
    dbConn.query(sql, [fechaInicio, fechaFinal, monto, cliente, habitacion, metodo], function (err, result) {
      if (err) throw err;
        console.log("1 record inserted");
    });
  },

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE

  // Actualizar los datos de un administrador
  updateAdmin: function(id, cedula, nombre, fecha){
    var sql = "UPDATE Administrador SET Cedula = ?, Nombre = ?, FechaContratacion = ? WHERE IdAdministrador = ?";
    dbConn.query(sql, [id, cedula, nombre, fecha], function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un cliente
  updateClient: function(id, nombre, apellidos, correo, nacionalidad, fecha){
    var sql = "UPDATE Cliente SET Nombre = ?, Apeliidos = ?, Correo = ?, Nacionalidad = ?, FechaNacimiento = ? WHERE IdCliente = ?";
    dbConn.query(sql, [id, nombre, apellidos, correo, nacionalidad, fecha], function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de una cuenta
  updateAccount: function(id, username, contrasenia, categoria){
    var sql = "UPDATE Cuenta SET Username = ?, Contraseña = ?, Categoria_IdCategoria = ? WHERE IdCuenta = ?";
    dbConn.query(sql, [id, username, contrasenia, categoria], function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de las facturas
  updateCheck: function(id, descripcion, fecha, total){
    var sql = "UPDATE Factura SET Descripcion = ?, Fecha = ?, Total = ? WHERE IdFactura = ?";
    dbConn.query(sql, [id, descripcion, fecha, total], function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un gerente
  updateManager: function(id, descripcion, hotel){
    var sql = "UPDATE Gerente SET Descripcion = ?, Hotel_IdHotel = ? WHERE IdGerente = ?";
    dbConn.query(sql, [id, descripcion, hotel], function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un alto gerente
  updateHighManager: function(id, descripcion){
    var sql = "UPDATE Gerente_Alto_Nivel SET Descripcion = ? WHERE IdGerente_Alto_Nivel = ?";
    dbConn.query(sql, [id, descripcion], function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de una habitacion
  updateRoom: function(id, nombre, tipo, numCamas, capacidad, descripcion, precio){
    var sql = "UPDATE Habitacion SET Nombre = ?, Tipo = ?, Num_camas = ?, Capacidad = ?, Descripcion = ?, Precio = ? WHERE IdHabitacion = ?";
    dbConn.query(sql, [id, nombre, tipo, numCamas, capacidad, descripcion, precio], function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un hotel
  updateHotel: function(id, nombre, estrellas, descripcion, ubicacion){
    var sql = "UPDATE Hotel SET Nombre = ?, Estrellas = ?, Descripcion = ?, Ubicacion = ? WHERE IdHotel = ?";
    dbConn.query(sql, [id, nombre, estrellas, descripcion, ubicacion], function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un metodo de pago
  updateMethod: function(id, tipo){
    var sql = "UPDATE 'metodo de pago' SET Tipo = ? WHERE IdMetodo = ?";
    dbConn.query(sql, [id, tipo], function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de un recepcionista
  updateReceptionist: function(id, descripcion, hotel){
    var sql = "UPDATE Recepcionista SET Descripcion = ?, Hotel_IdHotel = ? WHERE IdRecepcionista = ?";
    dbConn.query(sql, [id, descripcion, hotel], function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de una reserva
  updateReservation: function(id, fechaInicio, fechaFinal){
    var sql = "UPDATE Reserva SET FechaInicio = ?, FechaFin = ? WHERE IdReserva = ?";
    dbConn.query(sql, [fechaInicio, fechaFinal, id], function (err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  },

  // Actualizar los datos de una tarjeta de credito
  updateCreditCard: function(id, numTarjeta, tarHabitante, CCV, fecha){
    var sql = "UPDATE Tarjeta SET NumTarjeta = ?, TarjetaHabitante = ?, CCV = ?, FechaCaducidad = ? WHERE IdTarjeta = ?";
    dbConn.query(sql, [id, numTarjeta, tarHabitante, CCV, fecha], function (err, result) {
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
  selectReceptionistbyGerente,
  selectReceptionistReserve,
  selectReservation,
  selectReservationUnique,
  selectReservationByCliente,
  selectHotelUnique,
  selectCategories
}
