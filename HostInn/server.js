const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static("express"));
app.use("/public", express.static(__dirname + "/public"));
app.use("/views", express.static(__dirname + "/views"));


//-------------------------------- Controlamos las paginas ------------------------

// sitio por defecto del sitio web
app.get('/', function (req, res) {

    var hoteles = [
        {nombre: "Hotel el Pepe",  ubicacion: "Playa Sucia", estrellas: 5, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:1},
        {nombre: "Hotel el Buen Dormir",  ubicacion: "Volcan Poas", estrellas: 4, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:1},
        {nombre: "Hotel San Juan",  ubicacion: "Playa San Juan", estrellas: 5, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:1},
        {nombre: "Hotel Doña Checha",  ubicacion: "Rio Virilla", estrellas: 1, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:1},
        {nombre: "Hotel Invisible",  ubicacion: "Playa que no existe", estrellas: 5, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:0},
        {nombre: "Hotel visible",  ubicacion: "Playa que si existe", estrellas: 3, Descripcion: "este es un hotel", rutaImagen:"https://picsum.photos/450/300", Estado:1}
    ]

    res.render(path.join(__dirname + '/views/pages/homepage.ejs'), 
        {hoteles:hoteles});
    //__dirname : It will resolve to your project folder.
});


// sitio habitaciones
app.get('/rooms', function (req, res) {
    res.render(path.join(__dirname + '/views/test.ejs'));
    //__dirname : It will resolve to your project folder.
});

 // -------------------------------------------------------------------------------





const server = http.createServer(app);
const port = 3000;
server.listen(port);

const router = require('./src/router')

console.debug('Server listening on port ' + port);