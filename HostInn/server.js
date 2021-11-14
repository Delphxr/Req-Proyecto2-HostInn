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



    // nota: se recomiendan imagenes con ratio de 3:2
    var hoteles = [
        {id: 1, nombre: "Hotel el Pepe",  ubicacion: "Playa Sucia", estrellas: 5, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:1},
        {id: 2, nombre: "Hotel el Buen Dormir",  ubicacion: "Volcan Poas", estrellas: 4, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/200/400", Estado:1},
        {id: 3, nombre: "Hotel San Juan",  ubicacion: "Playa San Juan", estrellas: 5, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:1},
        {id: 4, nombre: "Hotel Doña Checha",  ubicacion: "Rio Virilla", estrellas: 1, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:1},
        {id: 5, nombre: "Hotel Invisible",  ubicacion: "Playa que no existe", estrellas: 5, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:0},
        {id: 6, nombre: "Hotel visible",  ubicacion: "Playa que si existe", estrellas: 3, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:1}
    ]

    res.render(path.join(__dirname + '/views/pages/homepage.ejs'), 
        {hoteles:hoteles});
    //__dirname : It will resolve to your project folder.
});


// sitio habitaciones
// :hotelId es el parametro con el id del hotel
app.get('/rooms/:hotelId', function (req, res) {

    var hotelId = req.params.hotelId
        
    var hotel = {nombre: "el id del hotel es: " + hotelId,  ubicacion: "Playa Sucia", estrellas: 5, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:1}

    var habitaciones = [
        {nombre: "Suite Matrimonial",  tipo: "Suite", camas: 1, capacidad: 3, Descripcion: "esta es una habitacion", rutaImagen:"https://picsum.photos/450/300", Estado:1},
        {nombre: "Suite Matrimonial",  tipo: "Suite", camas: 1, capacidad: 3, Descripcion: "esta es una habitacion", rutaImagen:"https://picsum.photos/450/300", Estado:1}
    ]

    res.render(path.join(__dirname + '/views/pages/rooms.ejs'), 
    {hotel:hotel, habitaciones:habitaciones});
    //__dirname : It will resolve to your project folder.
});

 // -------------------------------------------------------------------------------





const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);