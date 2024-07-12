const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const url = require('url'); // pas utiliser

const port = 8080;

const { Server } = require("socket.io"); // pas utiliser




const server = http.createServer((req, res) => {

    let name = 'whoever you are';

    if (req.url.indexOf("?name=") !== -1) {
        name = req.url.split("?name=")[1];
    }

    let file = fs.readFileSync('index.html', 'utf8'); // lis le .html et le stock dans la variable file
    file = file.replace("$NAME", name); // remplace $name dans la variable file par name (Martin ou )
    res.end(file); // envoie la variable file comme réponse
});


server.on('connection', (io) => { // connection handling bizare que ça marche avec io

    console.log('Client connected');

    io.on('close', () => {               // detecte si l'utilisateur se déconnecte
        console.log('Client disconnected');
    });

});

server.listen(port, () => {                   //listen port 8080 définis tout en haut

    console.log(`server running on ${port}`);

});
