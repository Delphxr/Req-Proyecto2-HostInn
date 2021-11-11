const http = require('http');
const express = require('express');
const path = require('path');
const app = express();


app.use(express.json());
app.use(express.static("express"));
app.use("/public", express.static(__dirname + "/public"));

// sitio por defecto del sitio web
app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/express/index.html'));
    //__dirname : It will resolve to your project folder.
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);

const router = require('./src/router')

console.debug('Server listening on port ' + port);