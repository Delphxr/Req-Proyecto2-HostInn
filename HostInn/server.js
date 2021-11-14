const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static("express"));
app.use("/public", express.static(__dirname + "/public"));
app.use("/views", express.static(__dirname + "/views"));

const router = require('./src/model')


//-------------------------------- Controlamos las paginas ------------------------

// sitio por defecto del sitio web
app.get('/', function (req, res) {
    // obtiene todos los hoteles registrados en la base de datos
    const value = router.selectHotels(function (err, data) {
        var hoteles = JSON.parse(JSON.stringify(data));
        // nota: se recomiendan imagenes con ratio de 3:2
        console.log(hoteles)
        res.render(path.join(__dirname + '/views/pages/homepage.ejs'),
            { hoteles: hoteles });
        //__dirname : It will resolve to your project folder.
    });
});


// sitio habitaciones
// :hotelId es el parametro con el id del hotel
app.get('/rooms/:hotelId', function (req, res) {

    var hotelId = req.params.hotelId

    const value = router.selectRoomsUnique(function (err, data) {
        var habitaciones = JSON.parse(JSON.stringify(data));
        var hotel = { nombre: "el id del hotel es: " + hotelId, ubicacion: "Playa Sucia", estrellas: 5, Descripcion: "este es un hotel", rutaImagen: "https://picsum.photos/450/300", Estado: 1 }

        // nota: se recomiendan imagenes con ratio de 3:2
        console.log(habitaciones)
        res.render(path.join(__dirname + '/views/pages/rooms.ejs'),
            { hotel: hotel, habitaciones: habitaciones });
        //__dirname : It will resolve to your project folder.
    },hotelId);







    //__dirname : It will resolve to your project folder.
});

// -------------------------------------------------------------------------------





const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);