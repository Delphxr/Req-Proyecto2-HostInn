const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static("express"));
app.use(express.urlencoded({
    extended: true
}))
app.use("/public", express.static(__dirname + "/public"));
app.use("/views", express.static(__dirname + "/views"));

const router = require('./src/model');

// variable para manejar los inicios de secion
var sesion = { usuario: "", password: "", tipo: 0, id: 0, activo: false }


//-------------------------------- Controlamos las paginas ------------------------
app.get('/', function (req, res) {
    res.redirect('/homepage');
});


// pantalla de inicio de sesion / registro
app.get('/log', function (req, res) {
    if (sesion.activo == true) { res.redirect('/homepage'); }
    res.render(path.join(__dirname + '/views/pages/register.ejs'));
});

//al recibir un input de un form
app.post('/login', (req, res) => {
    const username = req.body.user
    const password = req.body.password

    const value = router.selectAccounts(function (err, data) {
        var users = JSON.parse(JSON.stringify(data));
        users.forEach(element => {

            if (element.Username == username && element.Contraseña == password) {
                sesion.activo = true
                sesion.usuario = username
                sesion.password = password
                sesion.tipo = element.Categoria_IdCategoria
                sesion.id = element.IdCuenta

                res.redirect('/homepage');

            }
        });
        if (sesion.activo == false) { res.redirect('/log'); }

    })
})

app.get('/logout', function (req, res) {
    console.log("logout")
    sesion.usuario = ""
    sesion.activo = false
    sesion.tipo = 0
    sesion.password = ""
    sesion.id = 0
    res.redirect('/homepage');
});

//al recibir un input de un register
app.post('/register', (req, res) => {
    datos = req.body
    console.log(datos)

    //manejar aqui el register con la BD
    res.redirect('/homepage');
})




// sitio por defecto del sitio web
app.get('/homepage', function (req, res) {
    // obtiene todos los hoteles registrados en la base de datos
    const value = router.selectHotels(function (err, data) {
        var hoteles = JSON.parse(JSON.stringify(data));
        // nota: se recomiendan imagenes con ratio de 3:2

        console.log(sesion)
        res.render(path.join(__dirname + '/views/pages/homepage.ejs'),
            { hoteles: hoteles, user: sesion });
        //__dirname : It will resolve to your project folder.
    });
});


// sitio habitaciones
// :hotelId es el parametro con el id del hotel
app.get('/rooms/:hotelId', function (req, res) {

    var hotelId = req.params.hotelId

    const value = router.selectRoomsUnique(function (err, data) {
        var habitaciones = JSON.parse(JSON.stringify(data));

        var hotel = habitaciones[0]

        if (habitaciones.length == 0) {
            hotel = {
                nombreHotel: 'HOTEL VACIO',
                descripcionHotel: 'Este hotel no posee habitaciones!',
                rutaImagen: ""
            }
        }

        // nota: se recomiendan imagenes con ratio de 3:2
        console.log(habitaciones, hotel)
        res.render(path.join(__dirname + '/views/pages/rooms.ejs'),
            { hotel: hotel, habitaciones: habitaciones, user: sesion });
        //__dirname : It will resolve to your project folder.
    }, hotelId);

});

// pagina de reservar habitacion
app.get('/reserve/:roomId', function (req, res) {

    var roomId = req.params.roomId

    const value = router.selectOneRoom(function (err, data) {
        var habitacion = JSON.parse(JSON.stringify(data));

        console.log(habitacion)
        if (sesion.activo == true && (sesion.tipo == 1 || sesion.tipo == 4)) {
            res.render(path.join(__dirname + '/views/pages/reservar.ejs'),
                { habitacion: habitacion[0], user: sesion });
        } else {
            res.redirect('/log');
        }

    }, roomId);

});


//al recibir un input de un register
app.post('/reservacion', (req, res) => {
    var datos = req.body
    var llegada = datos.llegada
    var salida = datos.salida
    var adultos = datos.adultos
    var ninos = datos.ninos
    var cantidad_habitaciones = datos.cantidad
    var id_habitacion = datos.idHabitacion

    console.log(datos)

    var edades = []
    for (var i = 1; i <= ninos; i++) {
        var key = "edad-" + i
        edades.push(datos[key])
    }

    //manejar aqui los datos de la reservacion con la BD
    res.redirect('/homepage');
})



// pagina de historial cliente
app.get('/history-cliente', function (req, res) {
    var idCliente = sesion.id
    const value = router.selectReservationByCliente(function (err, data) {
        var history = JSON.parse(JSON.stringify(data));

        console.log(history)
        if (sesion.activo == true) {
            res.render(path.join(__dirname + '/views/pages/historial.ejs'),
                { historial: history, user: sesion });
        } else {
            res.redirect('/log');
        }
    }, idCliente);
});







// pagina de reservar habitacion
app.get('/edit_reservacion/:idreservacion', function (req, res) {

    var idreservacion = req.params.idreservacion

    const value = router.selectReservationUnique(function (err, data) {
        var history = JSON.parse(JSON.stringify(data));

        console.log(history)
        if (sesion.activo == true) {
            res.render(path.join(__dirname + '/views/pages/editar_historial.ejs'),
                { history: history[0], user: sesion });
        } else {
            res.redirect('/log');
        }


    }, idreservacion);

});

//al recibir un input de editar_res
app.post('/gestionar-recepcionistas', (req, res) => {
    var datos = req.body

    var llegada = datos.llegada
    var salida = datos.salida
    var num_reservacion = datos.num_reservacion

    console.log(datos)


    //manejar aqui los datos de la reservacion con la BD
    res.redirect('/homepage');
})


// manejamos el cancelar una reservacion
app.get('/cancelar-reserva/:idreservacion', function (req, res) {

    var idreservacion = req.params.idreservacion
    console.log(idreservacion)
    //manejar aqui la cancelacion
    router.deleteReservation(idreservacion);
    res.redirect('/homepage');

});

// manejamos el cancelar una reservacion
app.get('/gestionar-recepcionistas', function (req, res) {

    var idgerente = sesion.id 

    const value = router.selectReceptionistbyGerente(function (err, data) {
        var recepcionistas = JSON.parse(JSON.stringify(data));

        console.log(recepcionistas)
        if (sesion.activo == true) {
            res.render(path.join(__dirname + '/views/pages/recepcionistas.ejs'),
                { recepcionistas: recepcionistas, user: sesion });
        } else {
            res.redirect('/log');
        }



    }, idgerente);

});



// -------------------------------------------------------------------------------





const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);