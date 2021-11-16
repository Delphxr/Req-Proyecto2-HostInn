const http = require('http');
const express = require('express');
const fs = require("fs");
const path = require('path');
const app = express();
const multer = require("multer");

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static("express"));
app.use(express.urlencoded({
    extended: true
}))
app.use("/public", express.static(__dirname + "/public"));
app.use("/views", express.static(__dirname + "/views"));

const router = require('./src/model');
const { JsxEmit } = require('typescript');

// variable para manejar los inicios de secion
var sesion = { usuario: "", password: "", tipo: 0, id: 0, activo: false }

//funcion para hacer el id de las imagenes que subimos
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}



////////////////////////////////////////////////////////////////////////////////////

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!" + err);
};

const upload = multer({
    dest: path.join(__dirname, "/public/uploads_temp")
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

//////////////////////////////////////////////////////////////////////////////////////



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
    datos = req.body;
    nombre = datos.nombre.split(" ");
    habitante = nombre[0] + " " + nombre[1];
    caducidadTarjeta = datos.year + '/' + datos.month + '/1'
    console.log(datos)

    //manejar aqui los datos del registro con la BD
    router.insertCuenta(datos.user, datos.password, 1);
    router.insertClient(nombre[0], nombre[1], datos.email, datos.country, datos.nacimiento);
    router.insertCreditCard(datos.card_num, habitante, datos.code, caducidadTarjeta, 2);
    router.insertMethodXClientWeb(2);
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
                ImagenHotel: ""
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


//al recibir un input de un register de reservacion
app.post('/reservacion', (req, res) => {
    var datos = req.body
    var llegada = datos.llegada
    var salida = datos.salida
    var adultos = datos.adultos
    var ninos = datos.ninos
    var cantidad_habitaciones = datos.cantidad
    var id_habitacion = datos.idHabitacion
    var idCuenta = sesion.id

    console.log(datos)

    var edades = []
    for (var i = 1; i <= ninos; i++) {
        var key = "edad-" + i
        edades.push(datos[key])
    }

    //manejar aqui los datos de la reservacion con la BD
    router.insertReservation(llegada, salida, idCuenta, id_habitacion, 2, cantidad_habitaciones)
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
app.post('/editar-res', (req, res) => {
    var datos = req.body

    var llegada = datos.llegada
    var salida = datos.salida
    var num_reservacion = datos.num_reservacion

    console.log(datos)


    router.updateReservation(num_reservacion, llegada, salida);
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

// manejamos el gestionar recepcionistas
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

// manejamos el editar un recepcionista
app.get('/editar-recepcionista/:idrecepcionista', function (req, res) {

    var idrecepcionista = req.params.idrecepcionista
    console.log(idrecepcionista)

    const value = router.selectReceptionistById(function (err, data) {
        var recepcionista = JSON.parse(JSON.stringify(data));

        console.log(recepcionista)
        if (sesion.activo == true) {
            res.render(path.join(__dirname + '/views/pages/editar-administrador.ejs'),
                { administrador: recepcionista[0], user: sesion });
        } else {
            res.redirect('/log');
        }
    }, idrecepcionista);

});



//al recibir un input de editar_res
app.post('/update-admin', (req, res) => {
    var datos = req.body


    console.log(datos)

    router.updateAdmin(datos.cedula, datos.nombre, datos.idAdministrador)
    //aqui manejamos editar el administrador
    res.redirect('/homepage');
})




// manejamos el gestionar recepcionistas
app.get('/gestionar-gerentes', function (req, res) {


    const value = router.selectManagers(function (err, data) {
        var gerentes = JSON.parse(JSON.stringify(data));

        console.log(gerentes)
        if (sesion.activo == true) {
            res.render(path.join(__dirname + '/views/pages/gerentes.ejs'),
                { gerentes: gerentes, user: sesion });
        } else {
            res.redirect('/log');
        }
    });
});

// manejamos el editar un gerente
app.get('/editar-gerente/:idgerente', function (req, res) {

    var idgerente = req.params.idgerente
    console.log(idgerente)

    const value = router.selectManagersByID(function (err, data) {
        var gerente = JSON.parse(JSON.stringify(data));

        console.log(gerente)
        if (sesion.activo == true) {
            res.render(path.join(__dirname + '/views/pages/editar-administrador.ejs'),
                { administrador: gerente[0], user: sesion });
        } else {
            res.redirect('/log');
        }
    }, idgerente);

});



// manejamos el gestionar recepcionistas
app.get('/gestionar-hoteles', function (req, res) {


    const value = router.selectHotels(function (err, data) {
        var hoteles = JSON.parse(JSON.stringify(data));

        console.log(hoteles)
        if (sesion.activo == true) {
            res.render(path.join(__dirname + '/views/pages/hoteles.ejs'),
                { hoteles: hoteles, user: sesion });
        } else {
            res.redirect('/log');
        }
    });
});



// manejamos registrar un nuevo adminiiador
app.get('/nuevo-admin/:tipo', function (req, res) {

    var tipo = req.params.tipo //esto es el tipo de usuario
    /*
    2	Gerente
    3	Gerente de alto nivel
    4	Recepcionista
    */
    console.log(tipo)

    const value = router.selectHotels(function (err, data) {
        var hoteles = JSON.parse(JSON.stringify(data));

        console.log(hoteles)
        if (sesion.activo == true) {
            res.render(path.join(__dirname + '/views/pages/nuevoAdmin.ejs'),
                { hoteles: hoteles, user: sesion, tipo: tipo });
        }
        else {
            res.redirect('/log');
        }
    });


});

//al recibir un input de nuevo admin
app.post('/insertar-admin/:tipo', (req, res) => {
    var datos = req.body
    var tipo = req.params.tipo//esto es el tipo de usuario
    /*
    2	Gerente
    3	Gerente de alto nivel
    4	Recepcionista
    */
    var today = new Date();

    var fechaContratacion = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    console.log(datos, tipo) //si hay mas de un hotel, se reciben como array (SE RECIBE EL ID DEL HOTEL)

    //aqui manejamos editar el administrador
    res.redirect('/homepage');
})


//pagina de editar hotel
app.get('/editar-hotel/:idHotel', function (req, res) {

    var idHotel = req.params.idHotel

    const value = router.selectHotelUnique(function (err, data) {
        var hotel = JSON.parse(JSON.stringify(data));

        console.log(hotel)
        if (sesion.activo == true) {
            res.render(path.join(__dirname + '/views/pages/editar-hotel.ejs'),
                { hotel: hotel[0], user: sesion });
        } else {
            res.redirect('/log');
        }
    }, idHotel);
});

//respondemos al input de update hotel
app.post("/update-hotel", upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
        //creamos el nombre de la imagen que estamos subiendo

        const image_name = "image" + makeid(15);
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "/public/uploads/" + image_name + ".png");

        if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                res.redirect('/homepage');
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res.redirect('/homepage');
            });
        }

        var datos = req.body
        var ruta_imagen = "public/uploads/" + image_name + ".png"
        router.updateHotel(datos.nombre, datos.estrellas, datos.descripcion, datos.ubicacion, ruta_imagen, datos.idHotel)
        //el resto
    }
);


//pagina de nuevo hotel
app.get('/nuevo-hotel', function (req, res) {

    if (sesion.activo == true) {
        res.render(path.join(__dirname + '/views/pages/insertar-hotel.ejs'),
            { user: sesion });
    }
    else {
        res.redirect('/log');
    }
});


// respondemos al input de insertar hotel 
app.post("/insert-hotel", upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
        //creamos el nombre de la imagen que estamos subiendo

        const image_name = "image" + makeid(15);
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "/public/uploads/" + image_name + ".png");

        if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                res.redirect('/homepage');
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res.redirect('/homepage');
            });
        }

        var datos = req.body
        var ruta_imagen = "public/uploads/" + image_name + ".png"
        router.insertHotel(datos.nombre, datos.estrellas, datos.descripcion, datos.ubicacion, ruta_imagen)
        //el resto
    }
);



// sitio habitaciones
// :hotelId es el parametro con el id del hotel
app.get('/gestionar-habitaciones/:hotelId', function (req, res) {

    var hotelId = req.params.hotelId

    const value = router.selectRoomsUnique(function (err, data) {
        var habitaciones = JSON.parse(JSON.stringify(data));

        var hotel = habitaciones[0]

        if (habitaciones.length == 0) {
            hotel = {
                nombreHotel: 'HOTEL VACIO',
                descripcionHotel: 'Este hotel no posee habitaciones!',
                ImagenHotel: ""
            }
        }

        // nota: se recomiendan imagenes con ratio de 3:2
        console.log(habitaciones, hotel)
        res.render(path.join(__dirname + '/views/pages/gestionar-habitaciones.ejs'),
            { hotel: hotel, habitaciones: habitaciones, user: sesion , idHotel: hotelId});
        //__dirname : It will resolve to your project folder.
    }, hotelId);

});

//editamos una habitacion
// :hotelId es el parametro con el id del hotel
app.get('/editar-habitacion/:roomID', function (req, res) {

    var roomID = req.params.roomID

    const value = router.selectOneRoom(function (err, data) {
        var habitaciones = JSON.parse(JSON.stringify(data));

        var hotel = habitaciones[0]

        if (habitaciones.length == 0) {
            hotel = {
                nombreHotel: 'HOTEL VACIO',
                descripcionHotel: 'Este hotel no posee habitaciones!',
                ImagenHotel: ""
            }
        }

        // nota: se recomiendan imagenes con ratio de 3:2

        res.render(path.join(__dirname + '/views/pages/editar-habitacion.ejs'),
            { hotel: hotel, habitacion: habitaciones[0], user: sesion });
        //__dirname : It will resolve to your project folder.
    }, roomID);

});

//respondemos al input de update room
app.post("/update-room", upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
        //creamos el nombre de la imagen que estamos subiendo

        const image_name = "image" + makeid(15);
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "/public/uploads/" + image_name + ".png");

        if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                res.redirect('/homepage');
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res.redirect('/homepage');
            });
        }

        var datos = req.body
        var ruta_imagen = "public/uploads/" + image_name + ".png"
        console.log(datos)
        //el resto
        router.updateRoom(datos.nombre, datos.tipo, datos.camas, datos.capacidad,datos.descripcion, datos.precio, ruta_imagen, datos.IdHabitacion)
    }
);


// :hotelId es el parametro con el id del hotel
app.get('/nueva-habitacion/:hotelID', function (req, res) {

    var hotelID = req.params.hotelID

    if (sesion.activo == true) {
        res.render(path.join(__dirname + '/views/pages/insertar-habitacion.ejs'),
            { user: sesion, hotel: hotelID });
    }
    else {
        res.redirect('/log');
    }

});


//respondemos al input de insert room
app.post("/insert-room", upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
        //creamos el nombre de la imagen que estamos subiendo

        const image_name = "image" + makeid(15);
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "/public/uploads/" + image_name + ".png");

        if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                res.redirect('/homepage');
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res.redirect('/homepage');
            });
        }

        var datos = req.body
        var ruta_imagen = "public/uploads/" + image_name + ".png"
        console.log(datos)
        //el resto
        router.insertRoom(datos.nombre, datos.tipo, datos.camas, datos.capacidad,datos.descripcion, datos.precio, datos.IdHotel, ruta_imagen)
    }
);


// manejamos el eliminar hotel
app.get('/eliminar-hotel/:id', function (req, res) {

    var id = req.params.id
    console.log(id)
    //manejar aqui la cancelacion
    router.deleteHotel(id);
    res.redirect('/homepage');

});


// manejamos el eliminar habitacion
app.get('/eliminar-habitacion/:id', function (req, res) {

    var id = req.params.id
    console.log(id)
    //manejar aqui la cancelacion
    router.deleteRoom(id);
    res.redirect('/homepage');

});



// -------------------------------------------------------------------------------





const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);